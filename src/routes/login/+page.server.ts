import { UserClient } from '$lib/clients/UserClient.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

export const actions: import('./$types').Actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData()
        const name = String(formData.get('name'))
        const client = new UserClient()

        let user = await client.getByName(name)

        if (!user) {
            user = await client.create(name)
        }

        cookies.set('userId', String(user.getId()).valueOf(), {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
        })

        cookies.set('userName', String(user.getName()).valueOf(), {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
        })

        throw redirect(302, '/')
    }
}