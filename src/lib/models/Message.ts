import { DatabaseRecord } from "$lib/models/DatabaseRecord"

export class Message extends DatabaseRecord {
    
    private date: Date
    private fromUserId: number
    private toUserId: number
    private text: string

    constructor(id: number, date: Date, fromUserId: number, toUserId: number, text: string) {
        super(id)

        this.date = date
        this.fromUserId = fromUserId
        this.toUserId = toUserId
        this.text = text
    }

    public getDate() {
        return this.date
    }

    public getFromUserId() {
        return this.fromUserId
    }

    public getToUserId() {
        return this.toUserId
    }
    
    public getText(): string {
        return this.text
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.getId(),
            date: this.getDate().toISOString(),
            fromUserId: this.getFromUserId(),
            toUserId: this.getToUserId(),
            text: this.getText()
        })
    }

    public static parse(json: string) {
        const parsed = JSON.parse(json)
        return new Message(
            parsed.id,
            new Date(parsed.date),
            parsed.fromUserId,
            parsed.toUserId,
            parsed.text
        )
    }
}