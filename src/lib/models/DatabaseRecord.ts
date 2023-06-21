export abstract class DatabaseRecord {
    
    private id: number

    constructor(id: number) {
        this.id = id
    }

    public abstract serialize(): string

    public getId() {
        return this.id
    }
}