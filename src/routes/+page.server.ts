import { username, userId } from '$lib/stores/Session';
import { UserClient } from '$lib/clients/UserClient.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
    let usernameValue: string | null = null
    let userIdValue = -1

    username.subscribe((value) => {
        usernameValue = value;
    })

    userId.subscribe((value) => {
        if (value) {
            userIdValue = value;
        }
    })
    
    const userClient = new UserClient()

    if (userIdValue == -1) {
        throw redirect(307, '../login')
    }

    return {
        username: usernameValue,
        userId: userIdValue,
        users: await userClient.listAllOtherUsers(userIdValue ?? -1),
    };
}
