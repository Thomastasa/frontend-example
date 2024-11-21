import { useState, Component, KeyboardEvent } from "react"


/**
 * A useState that stores the data in the browser's local storage.
 * Local storage is persisted across multiple browser tabs.
 *
 * @param keyName A key name to store and retrieve the data.
 * @returns [storedValue, setValue]. Implement the same way you would use useState.
 */
export const useLocalStorage = (keyName: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            if (value) {
                return JSON.parse(value)
            }
        } catch (err) {
            console.log(`useLocalStorage "${keyName}" get error:`, err)
        }
    })
    const setValue = (newValue: any) => {
        try {
            if (newValue === undefined || newValue === null) {
                window.localStorage.removeItem(keyName)
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(newValue))
            }
        } catch (err) {
            console.log(`useLocalStorage "${keyName}" set error:`, err)
        }
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}

/**
 * A useState that stores the data in the browser's session storage.
 * Session storage is only available in the current browser tab.
 *
 * @param keyName A key to store and retrieve the data.
 * @returns [storedValue, setValue]. Implement the same way you would use useState.
 */
export const useSessionStorage = (keyName: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.sessionStorage.getItem(keyName)
            if (value) {
                return JSON.parse(value)
            }
        } catch (err) {
            console.log(`useSessionStorage "${keyName}" get error:`, err)
        }
    })
    const setValue = (newValue: any) => {
        try {
            if (newValue === undefined || newValue === null) {
                window.sessionStorage.removeItem(keyName)
            } else {
                window.sessionStorage.setItem(keyName, JSON.stringify(newValue))
            }
        } catch (err) {
            console.log(`useSessionStorage "${keyName}" set error:`, err)
        }
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}

/**
 * Wait for the provided amount of milliseconds before continuing.
 * Example: await waitMilliSeconds(1000).
 *
 * @param {number} ms Milliseconds to wait.
 * @returns {Promise} Promise: The promise to await on.
 */
export const waitMilliSeconds = (ms: number): Promise<any> => {
    return new Promise((resolve: Function) => {
        setTimeout(function () {
            resolve()
        }, ms)
    })
}

/**
 * Check if a keypress event was the "ENTER" key.
 *
 * @param {*} event Event from a React Input.
 * @returns {boolean} True: If the keypress event was the "ENTER" key.
 * @returns {boolean} False: If the keypress event was not the "ENTER" key.
 */
export const isEventKeypressEnter = (event: KeyboardEvent<HTMLInputElement>): boolean => {
    return (event && (event?.key === 'Enter' || event?.keyCode === 13 || event?.charCode === 13))
}

/**
 * Set a state in a class component's context asynchronous. To be used with "await" in "async" functions.
 * Example: await setStateAsync(this, { key: value }).
 *
 * @param {Context} context The class component's context, usually the variable "this".
 * @param {object} state State object to set in the context.
 * @returns {Promise} Promise: The promise to await on.
 */
export const setStateAsync = (context: Component, state: object) => {
    return new Promise((resolve: any) => {
        context.setState(state, resolve)
    })
}
