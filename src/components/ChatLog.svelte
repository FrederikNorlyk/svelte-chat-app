<script lang="ts">
	import { Message } from "../models/Message";

    const messages = [
        new Message(1, "Hi there!"),
        new Message(2, "Hello :)"),
    ]
</script>

<ul>
    {#each messages as message}
        <li>{message.getText()}</li>
    {/each}
</ul>