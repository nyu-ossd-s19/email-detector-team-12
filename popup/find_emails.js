// SVG icon taken from:
// https://www.materialui.co/icon/content-copy
const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';

/**
 * Listen for messages from the content script.
 */
browser.runtime.onMessage.addListener((message) => {
	const { emails } = message;
	if (emails) {

		// Clear any old email addresses.
		const container = document.querySelector(".email-addresses");
		container.innerHTML = "";

		/**
		 * Builds and appends a no emails message to the DOM.
		 */
		function displayNoEmailMessage () {
			const text = document.createTextNode("404: No emails found");
			const h5 = document.createElement("h5");
			h5.appendChild(text);
			container.appendChild(h5);
		}

		/**
		 * Builds and appends an email address div to the DOM.
		 */
		function displayEmailAddress(email) {
			const input = document.createElement("input");
			input.value = email;
			const icon = document.createElement('div');
			icon.classList.add('copy-icon');
			icon.innerHTML = copyIcon;
			const div = document.createElement('div');
			div.classList.add('email-address');
			div.appendChild(input);
			div.appendChild(icon);
			container.appendChild(div);

			/**
			 * When the user clicks the copy icon, focus the
			 * email input and copy it to their clipboard.
			 */
			icon.addEventListener("click", () => {
				input.select();
				document.execCommand("copy");
			});
		}

		/**
		 * If no emails were found, display the no emails
		 * message. Otherwise, display the email addresses to
		 * the user.
		 */
		if (!emails.length) {
			displayNoEmailMessage();
			return;
		}
		emails.forEach((email) => {
			displayEmailAddress(email);
		});
	}
});

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
	const submit = document.querySelector(".js-submit");
	submit.addEventListener("click", (e) => {

		/**
		 * Sends a command to the content script to get all
		 * email addresses from the DOM.
		 * We can expect a response containing an array of
		 * email addresses.
		 */
		function findEmails(tabs) {
			browser.tabs.sendMessage(tabs[0].id, {
				command: "find emails",
			});
		}

		//Log the error to the console.
		function reportError(error) {
			console.error(`Find Emails Failed: ${error}`);
		}

		//Get active tab and call "findEmails()"
		browser.tabs.query({active: true, currentWindow: true})
		.then(findEmails)
		.catch(reportError);
	});
}

//There was an error executing the script.
function reportExecuteScriptError(error) {
	console.error(`Failed to execute email finder content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_scripts/email_finder.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);