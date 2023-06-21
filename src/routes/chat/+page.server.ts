import { username, userId } from '$lib/stores/Session';
import { UserClient } from '$lib/clients/UserClient.js';
import { UsernameGenerator } from '$lib/utils/UsernameGenerator.js';
import { User } from '$lib/models/User';
import { MessageClient } from '$lib/clients/MessageClient';

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
        usernameValue = UsernameGenerator.generate();
        
        let user = await userClient.getByName(usernameValue)
        if (user == null) {
            user = await userClient.create(usernameValue)
        }
        userIdValue = User.parse(user).getId()

        username.set(usernameValue);
        userId.set(userIdValue)
    }

    return {
        username: usernameValue,
        userId: userIdValue,
        users: await userClient.listAllOtherUsers(userIdValue ?? -1),
        messages: await messageClient.listMessagesBetween(1, 2)
    };
}
