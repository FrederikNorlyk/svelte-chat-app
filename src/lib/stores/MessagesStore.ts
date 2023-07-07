import type { Message } from "$lib/models/Message";
import { writable } from "svelte/store";

const MessageStore = writable([] as Message[])

export default MessageStore