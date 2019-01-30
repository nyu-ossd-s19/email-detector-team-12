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

  /*
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
