import { User } from "$lib/models/User";
import type { QueryResultRow } from "@vercel/postgres";
import { DatabaseClient } from "$lib/clients/DatabaseClient";

export class UserClient extends DatabaseClient {

    private parse(row: QueryResultRow) {
        return new User(row.id, row.name)
    }

    protected serialize(row: QueryResultRow) {
        return this.parse(row).serialize()
    }

    public async listAllOtherUsers(currentUserId: number) {
        const result = await this.pool.sql `SELECT * FROM users WHERE id != ${currentUserId}`;

        return result.rows.map((row) => this.serialize(row));
    }

    public async create(name: string) {
        const result = await this.pool.query(`INSERT INTO users(name) VALUES($1) RETURNING *`, [name])
        const row = result.rows[0]
        return this.parse(row)
    }

    public async getByName(name: string) {
        const result = await this.pool.sql `SELECT * FROM users WHERE name ILIKE ${name}`;

        if (result.rows.length == 0) {
            return null
        }

        return result.rows.map((row) => this.parse(row))[0];
    }
}