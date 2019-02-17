# Email Detector Style Guide

*Our attempt to making JS somewhat reasonable, and highly readable*

## Contents
1. [Naming](#naming-sec)
2. [Functions](#functions-sec)
3. [Variables](#variables-sec)
4. [Comments](#comments-sec)
5. [More Styling](#airbnb-guide)
6. [Popup & Manifest Styling](#popup-examples) 


## <a name="naming-sec"></a>Naming
* Use descriptive naming, that makes it easy to read your code. 
* When naming functions, instances, and objects, use camelCase.
* The use of PascalCase is encouraged when naming classes or constuctors.
    * PascalCase is similar to camelCase, but the first letter is also capitalized unlike camelCase
* Do not use trailing and leading underscores. 


## <a name="functions-sec"></a>Functions 
* We highly encourage the use of High Order Functions to keep pur code base compact.
* Try to use named function expressions, as opposed to function declarations. 
    * We encourage this because declarations are hoisted, which makes it easy to reference functions that are yet to be declared.
* Always use parentheses for immediately invoked functions.
* Never define functions within control and loop statements. 
* Avoid using arguments; use rest operator instead.
    * arguments, though useful in its time is slowly getting outdated with the popularity of the rest operator. 


### <a name="variables-sec"></a>Varibles 
* NEVER use var. We believe that var is truly evil due to its unpredictable nature. 
    * Always use const or let instead to avoid taking up the global namespace. 
* It is good practice to group all lets and consts together for readability. 
* Use a single const or let for each new variable.
* Last but not least, please don't use var. 


## <a name="comments-sec"></a>Comments 
* Avoid using single line comments, unless they are used in the same line as code. 
* For all new line comments, even if the comment is just one line, use multi-line comments for readability and to direct reader attention.
* Use /** ... */ for multi-line comments, with each comment on a new line with a leading \*.
    * Here's a good example: 
    /**
    /* This function does a lot more than exemplify 
    */


## <a name="airbnb-guide"></a>More Specific JS Styling Rules

We swear by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), and would like to forward our users to it for more specific style references.


## <a name="popup-examples"></a>MDN Web Extension Examples

For manifest and popup styling, look at examples on the [MDN guides](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Examples).
