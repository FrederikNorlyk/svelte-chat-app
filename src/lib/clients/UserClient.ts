import { POSTGRES_URL } from "$env/static/private";
import { User } from "$lib/models/User";
import { createPool, type QueryResultRow } from "@vercel/postgres";

export class UserClient {

    private pool

    constructor() {
        this.pool = createPool({
            connectionString: POSTGRES_URL
        });
    }

    public serialize(row: QueryResultRow) {
        return new User(row.id, row.name).serialize()
    }

    public async listAllOtherUsers(currentUserId: number) {
        const result = await this.pool.sql `SELECT * FROM users WHERE id != ${currentUserId}`;

        return result.rows.map((row) => this.serialize(row));
    }

    public async create(name: string) {
        const result = await this.pool.query(`INSERT INTO users(name) VALUES($1) RETURNING *`, [name])
        const row = result.rows[0]
        return this.serialize(row)
    }

    public async get(name: string) {
        const result = await this.pool.sql `SELECT * FROM users WHERE name = ${name}`;

        if (result.rows.length == 0) {
            return null
        }

        return result.rows.map((row) => this.serialize(row))[0];
    }
}