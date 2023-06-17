export class Contact {

    private name: string
    private online: boolean
    private image: string

    constructor(name: string, isOnline: boolean, image: string) {
        this.name = name
        this.online = isOnline
        this.image = image
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
}