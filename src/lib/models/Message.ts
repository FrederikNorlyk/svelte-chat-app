export class Message {
    private userId: number
    private text: string

    constructor(userId: number, text: string) {
        this.userId = userId
        this.text = text
    }

    public getUserId() : number {
        return this.userId
    }
    
    public getText(): string {
        return this.text
    }
}