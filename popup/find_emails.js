/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
	const submit = document.querySelector(".js-submit");
	submit.addEventListener("click", (e) => {
		
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