import { POSTGRES_URL } from "$env/static/private";
import type { DatabaseRecord } from "$lib/models/DatabaseRecord";
import { createPool, type QueryResultRow } from "@vercel/postgres";

export abstract class DatabaseClient<T extends DatabaseRecord> {
    protected pool

    constructor() {
        this.pool = createPool({
            connectionString: POSTGRES_URL
        });
    }

    protected abstract serialize(row: QueryResultRow): string
}