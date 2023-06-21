<script lang="ts">
	import { Message } from "$lib/models/Message";

    const messages = [
        new Message(1, "Hi there!"),
        new Message(2, "Hello 😊"),
        new Message(1, "Looooong message with a lot of words goes here. Looooong message with a lot of words goes here. Looooong message with a lot of words goes here. Looooong message with a lot of words goes here. Looooong message with a lot of words goes here. "),
    ]

    function isFromYou(message: Message) {
        return message.getUserId() === 1
    }
</script>

<ul class="space-y-5">
    {#each messages as message}
        <li class="flex">
            {#if !isFromYou(message)}
                <div class="grow"></div>
            {/if}
            <div class="p-2 rounded-md text-lg text-gray-700 {isFromYou(message) ? 'mr-20 bg-orange-100' : 'ml-20 bg-orange-300'}">
                {message.getText()}
            </div>
            {#if isFromYou(message)}
                <div class="grow"></div>
            {/if}
        </li>
    {/each}
</ul>