import { writable, type Writable } from 'svelte/store'

export const username: Writable<string|null> = writable(null)
export const userId: Writable<number|null> = writable(null)