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
    function runRegex() { }

    // NOTE: The follow is a JS regex that detects emails:
    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // This is taken from: https://emailregex.com/

    /**
     * Listen for messages from the background script.
     * Call "find_emails()" or "reset()".
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "find_emails") {
            // ...
        } else if (message.command === "reset") {
            // ...
        }
    });

})();
