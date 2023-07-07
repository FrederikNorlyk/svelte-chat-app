<script>
	import { enhance } from "$app/forms";

	let isLoggingIn = false
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Welcome {isLoggingIn ? '😃' : '😊'}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form 
			class="space-y-6" 
			method="POST" 
			use:enhance={() => {
				isLoggingIn = true;
		
				return async ({ update }) => {
					await update();
					isLoggingIn = false;
				};
			}}
		>
			<div>
				<label for="name" class="block text-sm font-medium leading-6 text-gray-900"
					>Whats your name?</label
				>
				<div class="mt-2">
					<input
						id="name"
						name="name"
						type="username"
						autocomplete="username"
						disabled={isLoggingIn}
						required
						class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={isLoggingIn}
					class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
					>{isLoggingIn ? 'Logging in...' : 'Get chatting!'}</button
				>
			</div>
		</form>
	</div>
</div>
