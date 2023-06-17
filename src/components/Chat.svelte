<script>
    import Button from "../components/Button.svelte";
    import ChatLog from "../components/ChatLog.svelte";
    import TextField from "../components/TextField.svelte";
</script>

<div class="grow flex flex-col p-5">
    <div class="grow">
        <ChatLog />
    </div>
    <div class="flex space-x-3">
        <div class="grow">
            <TextField />
        </div>
        <div>
            <Button text="Send" />
        </div>
    </div>
</div>