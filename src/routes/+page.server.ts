import { UserClient } from '$lib/clients/UserClient.js';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
    
    if (!locals.user) {
        throw redirect(307, '../login')
    }
    
    const userClient = new UserClient()

    return {
        users: await userClient.listAllOtherUsers(locals.user.id),
    };
}
