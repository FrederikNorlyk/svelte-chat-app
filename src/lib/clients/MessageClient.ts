import type { QueryResultRow } from "@vercel/postgres";
import { DatabaseClient } from "$lib/clients/DatabaseClient";
import { Message } from "$lib/models/Message";

export class MessageClient extends DatabaseClient<Message> {

    protected serialize(row: QueryResultRow) {
        return new Message(row.id, row.date, row.from_user_id, row.to_uesr_id, row.text).serialize()
    }

    public async listMessagesBetween(userId1: number, userId2: number) {
        const result = await this.pool.sql`SELECT * FROM messages WHERE from_user_id IN (${userId1}, ${userId2}) OR to_user_id IN (${userId1}, ${userId2})`;

        return result.rows.map((row) => this.serialize(row));
    }
}