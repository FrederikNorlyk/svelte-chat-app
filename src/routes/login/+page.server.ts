import { UserClient } from '$lib/clients/UserClient.js';
import { username, userId } from '$lib/stores/Session';

export const actions: import('./$types').Actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const name = String(formData.get('name'))
        const client = new UserClient()

        let user = await client.getByName(name)

        if (!user) {
            user = await client.create(name)
        }

        userId.set(user.getId())
        username.set(user.getName())

        return {status: 201}
    }
}

export async function load() {
    let userIdValue: number | null = null;

    userId.subscribe((value) => {
        userIdValue = value;
    });
    
    return {
        status: userIdValue ? 201 : 401
    }
}