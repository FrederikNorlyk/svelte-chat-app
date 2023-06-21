export class User {

    private name: string
    private online = false
    private image = ""
    private id: number

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    public getId() {
        return this.id
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