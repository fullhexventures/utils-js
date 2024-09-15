/**
 * Compares two floating point numbers to a specified degree of precision, and returns whether or not they are equivalent.
 * @param {number} a First floating point number.
 * @param {number} b Second floating point number.
 * @param {number} precision Number of decimal places to compare.
 * @returns Boolean indicating whether the two floats are the equivalent.
 */
export const compareFloats = (a, b, precision = 0) => {
    if (a === undefined && b === undefined) {
        return true;
    } else if (a === null && b === null) {
        return true;
    } else if (a && b) {
        return a.toFixed(precision) === b.toFixed(precision) && a.toFixed(precision) === b.toFixed(precision);
    } else {
        return false;
    }
};
