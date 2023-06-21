import { DatabaseRecord } from "$lib/models/DatabaseRecord"

export class User extends DatabaseRecord {

    private name: string
    private online = false
    private image = ""

    constructor(id: number, name: string) {
        super(id)
        
        this.name = name
    }

    public getName() {
        return this.name
    }

    public isOnline() {
        return this.online
    }

    public getImage() {
        return this.image
    }

    public serialize() {
        return JSON.stringify({
            id: this.getId(),
            name: this.getName()
        })
    }

    public static parse(json: string) {
        const parsed = JSON.parse(json)
        return new User(parsed.id, parsed.name)
    }
}