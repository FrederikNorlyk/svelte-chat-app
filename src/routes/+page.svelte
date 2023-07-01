<script lang="ts">
	import ChatLog from '$lib/components/ChatLog.svelte'
	import SideBar from '$lib/components/SideBar.svelte'
	import { Message } from '$lib/models/Message.js'
	import { User } from '$lib/models/User'
	import { onMount } from 'svelte'

	export let data

	const users = data.users.map((u) => User.parse(u))
	let messages: Message[] = []
    let messageText: string
	let otherUserId = users.length > 0 ? users[0].getId() : -1
	let currentUserId = data.userId

	async function sendMessage() {
		if (!messageText || !messageText.trim()) {
			return
		}
        
        const text = messageText
        messageText = '' // Clear the text instantly

		const response = await fetch('/message', {
			method: 'POST',
			body: JSON.stringify({ 
                message: text,
                fromUserId: currentUserId,
                toUserId: otherUserId
            }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const json = await response.json()
		const newMessage = Message.parse(json.message)
		messages = [...messages, newMessage]
	}

	onMount(async () => {
		messages = await getMessages()
	});

	async function onUserSelect(selectedUserId: number) {
        otherUserId = selectedUserId
        messages = await getMessages()
	}

    async function getMessages() {
        if (currentUserId == -1 || otherUserId == -1) {
            return []
        }

        const params = new URLSearchParams({
            'userId1': String(currentUserId).valueOf(), 
            'userId2': String(otherUserId).valueOf()
        })

        const response = await fetch('message?' + params)
        const json = await response.json()
        const messages = json.messages as string[]
        return messages.map((m) => Message.parse(m))
    }
</script>

<div class="flex h-full">
	<SideBar {users} {onUserSelect} />

	<div class="grow flex flex-col p-5">
		<div class="grow h-1 overflow-auto">
			<ChatLog {currentUserId} {messages} />
		</div>
		<form class="flex space-x-3 mt-5" on:submit|preventDefault={sendMessage}>
			<div class="grow">
				<input
					bind:value={messageText}
					type="text"
					name="me"
					id="message"
					autocomplete="off"
					class="grow block w-full rounded-md border-0 h-12 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
				/>
			</div>
			<div>
				<button
					type="submit"
					class="rounded-md bg-orange-600 h-12 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
					>Send</button
				>
			</div>
		</form>
	</div>
</div>
