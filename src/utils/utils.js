/**
 * Helper function to determine if a string value is really non-empty. Only whitespace strings
 * are also regarded as empty.
 *
 * @param stringToEvaluate The string value to test.
 * @returns {boolean} True if the string is empty. False otherwise.
 */
export function isNonEmptyString(stringToEvaluate) {
    return stringToEvaluate.replace(/\s/g, '').length !== 0;
}

/**
 * Helper function that checks if a given string value has a correct email format.
 *
 * @param stringToEvaluate The string value to test.
 * @returns {boolean} True if the value has a well-formed email format. False otherwise.
 */
export function isValidEmail(stringToEvaluate) {
    // eslint-disable-next-line
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(stringToEvaluate);
}