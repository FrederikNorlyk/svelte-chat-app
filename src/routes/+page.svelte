<script lang="ts">
	import Chat from "$lib/components/Chat.svelte";
	import SideBar from "$lib/components/SideBar.svelte";
	import { User } from "$lib/models/User";

    export let data;

    const users = data.users.map((u) => User.parse(u))
</script>

<div class="flex">
    <SideBar users={users} />
    <Chat />
</div>
