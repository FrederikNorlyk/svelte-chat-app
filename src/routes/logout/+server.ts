import { json } from '@sveltejs/kit';

export async function POST({cookies}) {
    cookies.set('userId', '', {
        path: '/',
        expires: new Date(0),
    })

    cookies.set('userName', '', {
        path: '/',
        expires: new Date(0),
    })

    return json({status: 201})
}