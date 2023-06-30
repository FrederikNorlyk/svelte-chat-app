import { MessageClient } from '$lib/clients/MessageClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { message } = await request.json()
    const client = new MessageClient()
    const newMessage = await client.create(8, 9, message)

    return json({ status: 201, message: newMessage.serialize() })
}