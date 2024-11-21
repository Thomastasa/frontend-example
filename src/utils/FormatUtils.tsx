import { notEmptyString } from "./ValidateUtils"

/**
 * Adds additional padding to a number if necessary.
 * If the number is a decimal, padding is calculated on the integer portion only.
 * For example: padNumber(1) returns '01'.
 * For example: padNumber(12) returns '12'.
 * For example: padNumber(123, 5) returns '00123'.
 * For example: padNumber(123.456, 5, 'x') returns 'xx123.456'.
 *
 * @param {number} number The number you wish to add padding to.
 * @param {number} paddedDigits How many digits are required to pad. If the number's digits are over this amount, no padding will be added. Defaults to 2.
 * @param {number} paddingCharacter What character to use as padding. Defaults to '0'.
 * @returns {string} String: With valid parameters, returns a string with padding added if required.
 * @returns {string} String: With invalid parameters, returns an empty String.
 */
export const padNumber = (number: number, paddedDigits: number = 2, paddingCharacter: string = '0'): string => {
    let paddedString = ''
    if (!Number.isNaN(number) && !Number.isNaN(paddedDigits) && notEmptyString(paddingCharacter)) {
        // split into parts to only pad the integer
        const numberParts = String(number).split('.')
        const integer = (numberParts.length > 0 ? parseInt(numberParts[0]) : 0)
        const decimal = (numberParts.length > 1 ? Number(numberParts[1]) : 0)
        const integerString = String(integer)
        const decimalString = (decimal > 0 ? ('.' + String(decimal)) : '')
        // calculate required additional padding
        const paddingDiff = (paddedDigits - integerString.length)
        const additionalPadding = (paddingDiff > 0 ? (new Array(paddingDiff).fill(paddingCharacter).join('')) : '')
        // set padded string
        paddedString = additionalPadding + integerString + decimalString
    }
    return paddedString
}

/**
 * Takes the provided Date object and formats it into a human readable format:
 * 11/21/2024 @ 3:03 PM
 *
 * @param {Date} date A valid Date object.
 * @returns {string} String: A human readable timestamp.
 */
export const formatHumanReadableTimestamp = (date: Date): string => {
    let timestamp = ''
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
        // set date string
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()
        const dateString = month + '/' + day + '/' + year
        // set time string
        const rawHr = date.getHours()
        const amPm = (rawHr > 12 ? 'PM' : 'AM')
        const hr = (rawHr > 12 ? rawHr - 12 : rawHr)
        const min = padNumber(date.getMinutes())
        const timeString = hr + ':' + min + ' ' + amPm
        // build timestamp
        timestamp = dateString + ' @ ' + timeString
    }
    return timestamp
}

/**
 * Parses a phone number and based on its length and country code, formats it into a human readable format.
 * Examples:
 *   Length 10: 5556669999 -> (555) 666-9999
 *   Length 11: starting with 1: 15556669999 -> +1 (555) 666-9999
 *   Length 12: starting with +1: +15556669999 -> +1 (555) 666-9999
 *
 * @param {string} phone A phone number string to format into human readable.
 * @returns {string} String: A human readable phone number if length is 10, 11 or 12. All others return same phone number passed in.
 */
export const formatPhoneNumber = (phone: string) => {
    if (notEmptyString(phone)) {
        if (phone.length === 10) {
            // 5556669999 -> (555) 666-9999
            return '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + '-' + phone.substring(6)
        } else if (phone.length === 11 && phone.substring(0, 1) === '1') {
            // 15556669999 -> +1 (555) 666-9999
            return '+' + phone.substring(0, 1) + ' (' + phone.substring(1, 4) + ') ' + phone.substring(4, 7) + '-' + phone.substring(7)
        } else if (phone.length === 12 && phone.substring(0, 2) === '+1') {
            // +15556669999 -> +1 (555) 666-9999
            return phone.substring(0, 2) + ' (' + phone.substring(2, 5) + ') ' + phone.substring(5, 8) + '-' + phone.substring(8)
        }
    }
    return phone
}
