<script lang="ts">
	import { goto } from "$app/navigation";
	import type { User } from "$lib/models/User";
	import UserList from "./UserList.svelte";

    export let users: User[]
    export let onUserSelect: (userId: number) => void
    export let isExpanded = true

    let activeUserId = users.length > 0 ? users[0].getId() : -1

    async function logout() {
        const {status} = await fetch('logout', {method: 'POST'})

        if (status === 200) {
            goto('login')
        }
    }
    
    function onClick(userId: number) {
        activeUserId = userId
        isExpanded = false
        onUserSelect(userId)
    }
</script>

<aside class="flex">
    <div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
        <span>
            <img draggable="false" class="w-auto h-6" src="svelte-32.svg" alt="">
        </span>

        <button draggable="false" on:click={() => {isExpanded = !isExpanded}} class="p-1.5 text-orange-400 transition-colors duration-200 bg-orange-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        </button>

        <a title="Log out" draggable="false" on:click|preventDefault={logout} href="." class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              
        </a>
    </div>
    
    <div class="{isExpanded ? 'block' : 'hidden'} md:block h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
        <UserList {users} {activeUserId} onUserSelect={onClick} />
    </div>
</aside>