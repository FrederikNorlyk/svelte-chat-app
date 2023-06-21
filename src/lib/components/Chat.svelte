<script>
    import Button from "$lib/components/Button.svelte";
    import ChatLog from "$lib/components/ChatLog.svelte";
    import TextField from "$lib/components/TextField.svelte";
</script>

<div class="grow flex flex-col p-5">
    <div class="grow">
        <ChatLog />
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