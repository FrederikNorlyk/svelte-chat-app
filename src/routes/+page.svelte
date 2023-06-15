<script>
    let count = 0

    function buttonClick() {
        count++
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>You clicked the button {count} times </p>
<button on:click={buttonClick}>Click me!</button>