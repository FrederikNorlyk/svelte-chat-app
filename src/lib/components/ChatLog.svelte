<script lang="ts">
	import type { Message } from "$lib/models/Message";

    export let messages: Message[];

    function isFromYou(message: Message) {
        return message.getFromUserId() === 1
    }
</script>

<ul class="space-y-5">
    {#each messages as message (message.getId())}
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