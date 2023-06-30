import { MessageClient } from '$lib/clients/MessageClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { message } = await request.json()
    const client = new MessageClient()
    const newMessage = await client.create(8, 9, message)

    return json({ 
        status: 201, 
        message: newMessage.serialize() 
    })
}

export async function GET({ url }) {
    const userId1 = Number(url.searchParams.get('userId1')).valueOf()
    const userId2 = Number(url.searchParams.get('userId2')).valueOf()
    const client = new MessageClient()
    const messages = await client.listMessagesBetween(userId1, userId2) 

    return json({ 
        status: 201, 
        messages: messages
    })
}