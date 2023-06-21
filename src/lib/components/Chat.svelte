<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ChatLog from '$lib/components/ChatLog.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import type { Message } from '$lib/models/Message';

	export let messages: Message[];
</script>

<div class="grow flex flex-col p-5">
	<div class="grow">
		<ChatLog {messages} />
	</div>
	<div class="flex space-x-3 mt-5">
		<div class="grow">
			<TextField />
		</div>
		<div>
			<Button text="Send" />
		</div>
	</div>
</div>
