
/**
 * Checks if a provided value is a string with at least 1 character.
 *
 * @param {*} value Value to validate.
 * @returns {boolean} True: The Value is a string with at least 1 character.
 * @returns {boolean} False: The Value is not a string or its a string with 0 characters.
 */
export const notEmptyString = (value: string): boolean => {
    return (typeof value === 'string' && value.length > 0)
}

/**
 * Checks if a provided value is an array with at least 1 entry.
 *
 * @param {*} value Value to validate.
 * @returns {boolean} True: The Value is an array with at least 1 entry.
 * @returns {boolean} False: The Value is not an array or it has no entries.
 */
export const notEmptyArray = (value: any): boolean => {
    return (Array.isArray(value) && value.length > 0)
}

/**
 * Check if the provided item is an object.
 *
 * @param {object} item Item to test.
 * @returns {boolean} True if the value is a valid object.
 * @returns {boolean} False if the value is not a valid object.
 */
export const isObject = (item: any): boolean => {
    return (typeof item === 'object' && item !== null)
}

/**
 * Check if the provided item is a date object.
 *
 * @param {object} item Item to test.
 * @returns {boolean} True if the value is a valid date object.
 * @returns {boolean} False if the value is not a valid date object.
 */
export const isDateObject = (item: any): boolean => {
    return (Object.prototype.toString.call(item) === '[object Date]')
}
