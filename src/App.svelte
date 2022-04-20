<script>
	import autosize from "autosize";

	const initialLandingMessage = `Your email inbox is a place where a zillion distracting emails bombard you. This app is a peaceful, silent place to write emails before sending it.

This app doesn't send email. When you're done writing your email here, you copy-paste it on your email app (Gmail, Outlook, etc), then send it. The emails you write here are stored in your browser.

Encrypted backup coming soon - access your draft emails from any device for $10/mo.`

	let emails = [];
	if(!localStorage.getItem('emails')) {
		emails = [{address: "", subject: "", message: "", showConfirm: false, showSaved: false, placeholder: initialLandingMessage}];
	} else {
		emails = JSON.parse(localStorage.getItem('emails'));
	}

	// make all placeholder value the same (so the landing message can be changed)
	for (let i = 0; i < emails.length; i++) {
		emails[i].placeholder = initialLandingMessage;
	}

	function addNewEmail(){
		emails.push({address: "", subject: "", message: "", showConfirm: false, showSaved: false, placeholder: initialLandingMessage});

		// save data in localStorage
		localStorage.setItem('emails', JSON.stringify(emails));
		emails = emails;
	}

	function deleteEmail(index) {
		emails.splice(index, 1); // at index, remove 1 element

		// save data in localStorage
		localStorage.setItem('emails', JSON.stringify(emails));
		emails = emails;

		if(emails.length == 0) {
			addNewEmail();
		}
	}

	function showConfirm(index) {
		emails[index].showConfirm = true;
		emails = emails;
	}

	function hideConfirm(index) {
		emails[index].showConfirm = false;
		emails = emails;
	}

	// debounce script
	let showTimer = [];
	let deleteTimer = [];

	function showSaved(index) {
		clearTimeout(showTimer[index]);
		showTimer[index] = setTimeout(() => {
			// show green check
			emails[index].showSaved = true;
		}, 500);

		// remove the green check
		clearTimeout(deleteTimer[index]);
		deleteTimer[index] = setTimeout(() => {
			// turn on the green save thing over here
			emails[index].showSaved = false;

			// save data in localStorage
			localStorage.setItem('emails', JSON.stringify(emails));
		}, 1100);

		emails = emails;
	}
</script>

<main class="p-3 relative">
	<p class="text-right mb-7 text-slate-400 max-w-2xl mx-auto xl:max-w-none">Built by <a href="https://twitter.com/liaoesque"><strong>@Liaoesque</strong></a></p>

	<!-- emails -->
	<div class="space-y-10">
		{#each emails as email, index}
			<div class="max-w-2xl mx-auto border shadow-md rounded-2xl p-5 py-3 bg-white">
				<div class="flex flex-col">

					<!-- address and green saved indicator -->
					<div class="flex mb-1">
						<span class="text-slate-400 mr-1">To: </span>
						<input on:keyup={() => showSaved(index)} type="text" class="border-0 w-full focus:ring-0 placeholder:text-slate-300 text-slate-600 p-0" placeholder="recipient@email.com" bind:value="{email.address}">

						{#if email.showSaved}
							<span class="rounded-md bg-green-50 text-green-300 px-1 font-mono">saved</span>
						{/if}
					</div>

					<!-- subject -->
					<div class="flex mb-5">
						<span class="text-slate-400 mr-1">Subject: </span>
						<input on:keyup={() => showSaved(index)} type="text" class="border-0 w-full focus:ring-0 placeholder:text-slate-300 text-slate-600 p-0" placeholder="Hey, this is your subject" bind:value="{email.subject}">
					</div>

					<!-- text area input -->
					<textarea on:keyup={() => showSaved(index)} use:autosize rows="15" class="border-0 focus:ring-0 placeholder:text-slate-400 text-slate-600 p-0 mb-3" placeholder="{email.placeholder}" bind:value="{email.message}"></textarea>

					<!-- delete button -->
					{#if email.message != ""}
						<div class="flex space-x-1 text-slate-400 items-center">
							<!-- <button class="focus:outline-none hover:underline font-mono" on:click="{() => showConfirm(index)}">[delete]</button> -->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-300 hover:text-slate-400" on:click="{() => showConfirm(index)}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							{#if email.showConfirm == true}
								<span class="font-mono">Confirm delete?</span>
								<button class="text-red-500 focus:outline-none hover:underline font-mono" on:click="{() => deleteEmail(index)}">[yes]</button>
								<span class="font-mono">/</span>
								<button class="focus:outline-none hover:underline font-mono" on:click="{() => hideConfirm(index)}">[no]</button>
							{/if}
							<div class="flex-1"></div>
						</div>
					{/if}

					<!-- to avoid button popping up in a janky way -->
					{#if email.message == ""}
						<span class="invisible">empty</span>
					{/if}
					
				</div>
			</div>
		{/each}

	</div>

	<!-- add email -->
	{#if emails[0].message.length > 10}
		<button on:click="{addNewEmail}" class="block mx-auto mt-10 focus:outline-none text-slate-400 hover:text-slate-500">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	{/if}
</main>