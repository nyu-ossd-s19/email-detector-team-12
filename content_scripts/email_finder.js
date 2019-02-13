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
	 * 
	 * @param {string} [sortBy] - "frequency" or "alphabetical"
	 */
	function findEmails(sortBy) {
		/** 
		 * Email regex taken from:
		 * TODO: Make (or find) a better regexp
		 * https://stackoverflow.com/questions/16424659/check-if-a-string-contains-an-email-address
		 */
		const regex = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		const { innerHTML } = document.body;
		let emails = innerHTML.match(regex);
		if (!sortBy) {
			return [...new Set(emails)];
		}
		if (sortBy.method === "frequency") {
			/**
			 * Tally up the number of occurrences of each email
			 * address.
			 */
			const tally = {};
			emails.forEach(email => {
				if (tally[email]) tally[email]++;
				else tally[email] = 1;
			});
			/**
			 * Sort the email addresses based on the number of
			 * occurrences.
			 */
			const comparator = (email1, email2) => {
				const tally1 = tally[email1];
				const tally2 = tally[email2];
				if (sortBy.isInverted) {
					if (tally1 > tally2) return 1;
					if (tally1 < tally2) return -1;
				}
				if (tally1 > tally2) return -1;
				if (tally1 < tally2) return 1;
				return 0;
			}
			emails = emails.sort(comparator);
			return [...new Set(emails)];
		}
		if (sortBy.method === 'alphabetical') {
			/**
			 * Case insensitive alphabetical sort.
			 */
			const comparator = (email1, email2) => {
				email1 = email1.toLowerCase();
				email2 = email2.toLowerCase();
				if (sortBy.isInverted) {
					return email2.localeCompare(email1);
				}
				return email1.localeCompare(email2);
			}
			emails = [...new Set(emails)];
			return emails.sort(comparator);
		}
	}

	/**
	 * Listen for messages from the background script.
	 * Call "findEmails()" or "reset()".
	 */
	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "find emails") {
			browser.runtime.sendMessage({
				emails: findEmails(message.sort),
			});
		}
	});
})();
