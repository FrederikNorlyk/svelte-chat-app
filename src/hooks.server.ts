import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    const userId = event.cookies.get('userId')
    const userName = event.cookies.get('userName')

    if (!userId || !userName) {
        return await resolve(event)
    }

    event.locals.user = {
        id: Number(userId).valueOf(),
        name: userName
    }

    return await resolve(event)
}
