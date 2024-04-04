## Svelte chat app
Simple chat app, built using SvelteKit.

### Technologies
- SvelteKit
- Tailwind CSS

### What can it do?
🛑 This project is stil very much a work in progress.

The application allows you to chat with any user on the system. Its more of a way for me to learn Svelte than an actual application. Hence the lack of authentication.

### Installation
I'm hosting the app on [Vercel](https://vercel.com/). To link the application with you Vercel PostgreSQL database, run the follwing commands:
[Read more](https://vercel.com/docs/cli)
```
pnpm i -g vercel
vercel link
vercel env pull .env.development.local
```
