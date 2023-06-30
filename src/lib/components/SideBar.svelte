<script lang="ts">
	import { goto } from "$app/navigation";
	import type { User } from "$lib/models/User";

    export let users: User[]

    function isActive(contact: User) {
        return contact.getName().startsWith("Rachel")
    }

    async function logout() {
        const {status} = await fetch('logout', {method: 'POST'})

        if (status === 200) {
            goto('login')
        }
    }
    
</script>

<aside class="flex">
    <div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
        <span>
            <img draggable="false" class="w-auto h-6" src="svelte-32.svg" alt="">
        </span>

        <a draggable="false" href="#" class="p-1.5 text-orange-400 transition-colors duration-200 bg-orange-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        </a>

        <a title="logout" draggable="false" on:click|preventDefault={logout} href="." class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </a>
    </div>
    
    <div class="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
        <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Chats</h2>
        
        <div class="mt-8 space-y-4">
            {#each users as contact}
                <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                    <div class="relative">
                        {#if isActive(contact)}
                            <span class="w-0.5 h-12 bg-orange-400 absolute -left-5 -top-2"></span>
                        {/if}
                        <img draggable="false" class="object-cover w-8 h-8 rounded-full" src="https://avatars.dicebear.com/api/identicon/{contact.getName()}.svg" alt="Profile picture for {contact.getName()}">
                        {#if contact.isOnline()}
                            <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        {/if}
                    </div>

                    <div class="text-left rtl:text-right">
                        <h1 class="text-sm font-medium text-gray-700 dark:text-white">{contact.getName()}</h1>
        
                        <p class="text-xs text-gray-500 dark:text-gray-400">Last seen 7 minutes ago</p>
                    </div>
                </button>
            {/each}
        </div>
    </div>
</aside>