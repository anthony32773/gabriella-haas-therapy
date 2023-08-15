import isEmail from "validator/es/lib/isEmail";
import isLength from "validator/es/lib/isLength";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isAscii from "validator/es/lib/isAscii";
import isAlpha from "validator/es/lib/isAlpha";
import isInt from "validator/es/lib/isInt";

/**
 * Input validation function to check if a field has input in it.
 * Checks if the field is required that there is data present.
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @returns {boolean | string}
 */
function required(value: string | null, fieldName: string): boolean | string {
  return !!value || `${fieldName} Required!`;
}

/**
 * Input validation function to check if a field is a valid integer within 1 and 1000
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @param {number | undefined} [max = undefined] - Max integer to allow
 * @param {number | undefined} [min = undefined] - Min integer to allow
 * @returns {boolean | string}
 */
function isValidInt(
  value: string,
  fieldName: string,
  max: number | undefined = undefined,
  min: number | undefined = undefined
): boolean | string {
  if (min && max) {
    return (
      isInt(value, { min, max }) ||
      `${fieldName} is not a valid numeric input or is not between 1 and 1000!`
    );
  }
  return isInt(value) || `${fieldName} is not a valid numeric input or is not between 1 and 1000!`;
}

/**
 * Input validation function to check if a field contains only alphabetic characters and spaces.
 * Used for checking name fields
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @returns {boolean | string}
 */
function isValidAscii(value: string, fieldName: string): boolean | string {
  return isAscii(value) || `${fieldName} Must only contain alphabetic characters only!`;
}

/**
 * Input validation function to check if a field contains only alphabetic characters and spaces.
 * Used for checking name fields
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @returns {boolean | string}
 */
function isValidAlpha(value: string, fieldName: string): boolean | string {
  return (
    isAlpha(value, "en-US", { ignore: " -" }) || `${fieldName} Must Be Alphabetic Characters Only!`
  );
}

/**
 * Input validation function to check if a field is less than a certain amount of characters.
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @param {number} charCount - Max number of characters allowed for this field
 * @returns {boolean | string}
 */
function counter(value: string, fieldName: string, charCount: number): boolean | string {
  return (
    isLength(value, { max: charCount }) || `${fieldName} Must Be a Max of ${charCount} Characters!`
  );
}

/**
 * Input validation function to check if a field is at least this number of characters.
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field to validate - label on input
 * @param {number} charCount - Min number of characters allowed for this field
 * @returns {boolean | string}
 */
function minimum(value: string, fieldName: string, charCount: number): boolean | string {
  return (
    isLength(value, { min: charCount }) || `${fieldName} Must Be at Least ${charCount} Characters!`
  );
}

/**
 * Input validation function to check if the input is a valid email address
 * @param {string} value - String to validate
 * @returns {boolean | string}
 */
function isValidEmail(value: string): boolean | string {
  return isEmail(value) || "Invalid Email";
}

/**
 * Check if a value is a valid US or Canadian phone number
 * @param {string} value - String to validate
 * @returns {boolean | string}
 */
function isValidPhoneNumber(value: string): boolean | string {
  return isMobilePhone(value, ["en-US", "en-CA"]) || "This Phone Number is invalid!";
}

export {
  required,
  isValidAscii,
  counter,
  minimum,
  isValidEmail,
  isValidPhoneNumber,
  isValidAlpha,
  isValidInt,
};
