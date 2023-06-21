<script lang="ts">
	import Chat from "$lib/components/Chat.svelte";
	import SideBar from "$lib/components/SideBar.svelte";
	import { Message } from "$lib/models/Message.js";
	import { User } from "$lib/models/User";

    export let data;

    const users = data.users.map((u) => User.parse(u))
    const messages = data.messages.map((m) => Message.parse(m))
</script>

<div class="flex">
    <SideBar {users} />
    <Chat {messages} />
</div>
