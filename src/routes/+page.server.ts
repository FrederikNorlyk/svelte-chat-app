import { username, userId } from '$lib/stores/Session';
import { UserClient } from '$lib/clients/UserClient.js';
import { MessageClient } from '$lib/clients/MessageClient';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    let usernameValue: string | null = null;
    let userIdValue: number | null = null;

    username.subscribe((value) => {
        usernameValue = value;
    });

    userId.subscribe((value) => {
        userIdValue = value;
    });
    
    const userClient = new UserClient()
    const messageClient = new MessageClient()

    if (!userIdValue) {
        throw redirect(307, '../login')
    }

    return {
        username: usernameValue,
        userId: userIdValue,
        users: await userClient.listAllOtherUsers(userIdValue ?? -1),
        messages: await messageClient.listMessagesBetween(1, 2)
    };
}
