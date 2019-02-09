// Using Airbnb JavaScript Style Guide()
(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
	}
	
    window.hasRun = true;

	/**
	 * Runs a regular expression to find emails
	 * within a given page. Returns the strings
	 * that adhere to the regular expression as
	 * an array.
	 */
	function findEmails() {
		/** 
		 * Email regex taken from:
		 * https://stackoverflow.com/questions/16424659/check-if-a-string-contains-an-email-address
		 */
		const regex = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		const { innerHTML } = document.body;
		const emails = innerHTML.match(regex);

        // Remove duplicates using set conversion
        return [...new Set(emails)];
	}

	/**
	 * Formats an array of email addresses into a string.
	 * 
	 * @param {Array} emails - an array of strings
	 * @returns {String}
	 */
	function formatEmails(emails) {
		let msg = '';
		emails.forEach((email, index) => {
			msg += `${index+1}:\t${email}\n\n`;
		});
		return msg;
	}

	/**
	 * Listen for messages from the background script.
	 * Call "find_emails()" or "reset()".
	 */
	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "find emails") {
			const emails = findEmails();
			const formatedEmails = formatEmails(emails) || '404: Email not found';
			alert(formatedEmails);
		}
	});
})();
