<script lang="ts">
	import type { User } from '$lib/models/User';

	export let users: User[];
	export let activeUserId: number;
	export let onUserSelect: (userId: number) => void;
</script>

<h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Chats</h2>

<div class="mt-8 space-y-4">
	{#each users as user (user.getId())}
		<button
			on:click={() => onUserSelect(user.getId())}
			class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
		>
			<div class="relative">
				{#if user.getId() == activeUserId}
					<span class="w-0.5 h-12 bg-orange-400 absolute -left-5 -top-2" />
				{/if}
				<img
					draggable="false"
					class="border border-slate-100 object-cover w-8 h-8 rounded-full"
					src="https://avatars.dicebear.com/api/identicon/{user.getName()}.svg"
					alt="Profile picture for {user.getName()}"
				/>
				{#if user.isOnline()}
					<span
						class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"
					/>
				{/if}
			</div>

			<div class="text-left rtl:text-right">
				<h1 class="text-sm font-medium text-gray-700 dark:text-white">{user.getName()}</h1>

				<p class="text-xs text-gray-500 dark:text-gray-400">Last seen 7 minutes ago</p>
			</div>
		</button>
	{/each}
</div>
