<script lang="ts">
	import { Message } from "../../models/Message";

    var messages: Message[] = []
    var text = ""

    function handleSubmit() {
        console.log("Submitted!")
        messages = [...messages, new Message(1, text)]
        text = ""
        console.log(messages.length)
    }
</script>

<div>
    <ul>
        {#each messages as message}
		<li>
            {message.getText()}
		</li>
        {/each}
    </ul>
    
    <form on:submit|preventDefault={handleSubmit}>
        <label for="text">Enter a message:</label>
        <input bind:value={text} type="text" name="message"/>
        <button>Send</button>
    </form>
</div>