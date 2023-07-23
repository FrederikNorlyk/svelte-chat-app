import type { QueryResultRow } from "@vercel/postgres";
import { DatabaseClient } from "$lib/clients/DatabaseClient";
import { Message } from "$lib/models/Message";

export class MessageClient extends DatabaseClient {

    private parse(row: QueryResultRow) {
        return new Message(row.id, row.date, row.from_user_id, row.to_user_id, row.text)
    }

    protected serialize(row: QueryResultRow) {
        return this.parse(row).serialize()
    }

    public async listMessagesBetween(userId1: number, userId2: number) {
        const result = await this.pool.sql`SELECT * FROM chat_messages WHERE from_user_id IN (${userId1}, ${userId2}) AND to_user_id IN (${userId1}, ${userId2})`;

        return result.rows.map((row) => this.serialize(row));
    }

    public async create(fromUserId: number, toUserId: number, name: string) {
        const result = await this.pool.query(`INSERT INTO chat_messages (from_user_id, to_user_id, text) VALUES($1, $2, $3) RETURNING *`, [fromUserId, toUserId, name])
        const row = result.rows[0]
        return this.parse(row)
    }
}