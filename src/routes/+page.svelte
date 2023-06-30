<script lang="ts">
	import ChatLog from "$lib/components/ChatLog.svelte";
	import SideBar from "$lib/components/SideBar.svelte";
	import { Message } from "$lib/models/Message.js";
	import { User } from "$lib/models/User";

    export let data

    const users = data.users.map((u) => User.parse(u))
    let messages = data.messages.map((m) => Message.parse(m))

    let messageText: string

	async function sendMessage() {
        if (!messageText || !messageText.trim()) {
            return
        }

        const response = await fetch('/message', {
            method: 'POST',
            body: JSON.stringify({ message: messageText }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        messageText = ""

		const json = await response.json()
        const newMessage = json.message as string
		messages = [...messages, Message.parse(newMessage)]
    }
</script>

<div class="flex">
    <SideBar {users} />
    
    <div class="grow flex flex-col p-5">
        <div class="grow">
            <ChatLog {messages} />
        </div>
        <form class="flex space-x-3 mt-5" on:submit|preventDefault={sendMessage}>
            <div class="grow">
                <input bind:value={messageText} type="text" name="me" id="message" autocomplete="off" class="grow block w-full rounded-md border-0 h-12 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"> 
            </div>
            <div>
                <button type="submit" class="rounded-md bg-orange-600 h-12 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Send</button>
            </div>
        </form>
    </div>
</div>
