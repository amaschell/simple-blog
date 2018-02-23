export function isNonEmptyString(stringToEvaluate) {
    return stringToEvaluate.replace(/\s/g, '').length !== 0;
}

export function isValidEmail(stringToEvaluate) {
    // eslint-disable-next-line
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(stringToEvaluate);
}