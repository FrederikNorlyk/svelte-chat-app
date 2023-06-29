import { username, userId } from '$lib/stores/Session';
import { json } from '@sveltejs/kit';

export async function POST() {
    userId.set(null)
    username.set(null)

    return json({status: 201})
}