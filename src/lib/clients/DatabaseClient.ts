import { POSTGRES_URL } from "$env/static/private";
import { createPool, type QueryResultRow } from "@vercel/postgres";
import { Message } from "$lib/models/Message";

export abstract class DatabaseClient {
    protected pool

    constructor() {
        this.pool = createPool({
            connectionString: POSTGRES_URL
        });
    }

    protected abstract serialize(row:QueryResultRow): string
}