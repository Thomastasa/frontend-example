import { lib as CryptoJSLib, MD5 } from 'crypto-js'

import { notEmptyString } from './ValidateUtils'


/**
 * Read a selected File and convert it to an Image.
 *
 * @param {File} file A File that was selected from a user's device.
 * @returns {Promise} Promise: The promise to await on that contains the Image.
 */
export const readFileToImageAsync = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function () {
            const image = new Image()
            image.src = String(reader.result)
            image.onload = function () {
                resolve(image)
            }
        }
        reader.onerror = reject
        try {
            reader.readAsDataURL(file)
        } catch (e) {
            reject('Error reading file. Please try again')
        }
    })
}

/**
 * Read a selected File and return it as base64 encoded data.
 *
 * @param {File} file A File that was selected from a user's device.
 * @returns {Promise} Promise: The promise to await on that contains the base64 data.
 */
export const readFileToBase64Async = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
        try {
            reader.readAsDataURL(file)
        } catch (e) {
            reject('Error reading file. Please try again')
        }
    })
}

/**
 * Generate an MD5 hash of a selected File.
 *
 * @param {File} file A File that was selected from a user's device.
 * @returns {Promise} Promise: The promise to await on that contains the base64 data.
 */
export const getFileHashAsync = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            // Create an MD5 hash of the file
            const fileContents = reader.result as ArrayBuffer
            const wordArray = CryptoJSLib.WordArray.create(fileContents)
            const hash = MD5(wordArray)
            // Return the MD5 file hash as a string
            resolve(String(hash))
        }
        reader.onerror = (error) => reject(error)
        try {
            reader.readAsArrayBuffer(file)
        } catch (e) {
            reject('Error reading file. Please try again')
        }
    })
}


/**
 * Calculate new Height and Width dimensions of an image based on Maximum Height and Maximum Width values, while keeping the same aspect ratio.
 *
 * @param {number} height Height of Image to resize in Pixels.
 * @param {number} width Width of Image to resize in Pixels.
 * @param {number} maxHeight Max Height the Image can be in Pixels.
 * @param {number} maxWidth Max Width the Image can be in Pixels.
 * @returns {{number, number}} {Height, Width}: If they are less than their maximum values. Otherwise they are scaled down to maximum values, keeping the same aspect ratio.
 * @returns {null} Null: If invalid values were passed in.
 */
export const calcImageResizeDimensions = (height: number, width: number, maxHeight: number, maxWidth: number) => {
    if (!Number.isNaN(height) && !Number.isNaN(width) && !Number.isNaN(maxHeight) && !Number.isNaN(maxWidth)) {
        let h: number
        let w: number
        if (height > maxHeight || width > maxWidth) {
            h = ((height > width) ? maxHeight : ((height * maxWidth) / width))
            w = ((width > height) ? maxWidth : ((width * maxHeight) / height))
        } else {
            h = height
            w = width
        }
        return { h, w }
    }
    return null
}

/**
 * Takes a user selected File, ensures it meets the passed in requirements, then returns an Image Component.
 *
 * @param {File} imageFile A File that was selected from a user's device.
 * @param {number} minHeight The Minimum Pixel Height for the resized image.
 * @param {number} maxHeight The Maximum Pixel Height for the resized image.
 * @param {number} minWidth The Minimum Pixel Width for the resized image.
 * @param {number} maxWidth The Maximum Pixel Width for the resized image.
 * @param {number} maxBytes The Maximum Byte size for the resized image.
 * @returns {Promise.resolve(Image)} Promise.resolve(Image): If successful, returns an Image Component.
 * @returns {Promise.reject(string)} Promise.reject(string): If unsuccessful, returns an error message.
 */
export const loadFileAndResizeToImageComponent = async (imageFile: File, minHeight: number, maxHeight: number, minWidth: number, maxWidth: number, maxBytes: number) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
            const fileBase64 = String(reader.result)
            // check file has data
            if (notEmptyString(fileBase64)) {
                // convert to Image Component to get dimensions
                let image = new Image()
                image.src = fileBase64
                image.onload = () => {
                    // check image meets min height and width requirements
                    if (image && !Number.isNaN(image.height) && !Number.isNaN(image.width) && image.height >= minHeight && image.width >= minWidth) {
                        // calculate resize dimensions
                        const resizedDimensions = calcImageResizeDimensions(image.height, image.width, maxHeight, maxWidth)
                        // check resized dimensions are valid
                        if (resizedDimensions != null) {
                            let { h, w } = resizedDimensions
                            // create a resized Canvas
                            let canvas = document.createElement("canvas")
                            canvas.height = h
                            canvas.width = w
                            // set the Image Component data to a resized Canvas
                            let ctx = canvas.getContext("2d") as CanvasRenderingContext2D
                            ctx.drawImage(image, 0, 0, w, h)
                            // get Base64 string from the Canvas
                            const b64Image = canvas.toDataURL()
                            const byteSize = new Blob([b64Image]).size
                            // check the Byte size is valid after resize
                            if (byteSize <= maxBytes) {
                                // convert Base64 string back to an Image Component
                                let resizedImage = new Image()
                                resizedImage.src = b64Image
                                // pass back the resized Image Component
                                resolve(resizedImage)
                            } else {
                                reject("The selected file's size is too large. Please select a smaller file with a maximum file size of " + maxBytes + ' bytes.')
                            }
                        } else {
                            reject('Error processing file. Please try again.')
                        }
                    } else {
                        reject("The selected file's image dimensions are too small. Please select a larger image with a minimum height of " + minHeight + ' pixels and a minimum width of ' + minWidth + ' pixels.')
                    }
                }
            } else {
                reject('Error reading file. Please select a different file.')
            }
        }
        reader.onerror = () => reject('Error loading file. Please try again.')
        reader.readAsDataURL(imageFile)
    })
}

/**
 * Convert a url of an image to base64.
 *
 * @param {string} url Url to an image to be converted to base64.
 * @returns {Promise.resolve(string)} Promise.resolve(string): If successful, returns a Base64 representation of the image from the provided url.
 * @returns {Promise.reject(string)} Promise.reject(string): If unsuccessful, returns an error message.
 */
export const convertImageUrlToBase64 = async (url: string) => {
    if (notEmptyString(url)) {
        const data = await fetch(url)
        const blob = await data.blob()
        return new Promise((resolve: Function, reject: Function) => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64data = reader.result as String
                // return base64 image data
                resolve(base64data)
            }
            reader.onerror = (event) => reject(event)
        })
    } else {
        return Promise.reject('Invalid url')
    }
}
