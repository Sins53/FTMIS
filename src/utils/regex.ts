//password regex
/**
At least 8 characters long;
One lowercase, one uppercase, one number and one special character;
No whitespaces.

 **/
export const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;

/**
 * number validation
 */

export const numberRegex = /^[0-9]*$/;

/**
 * number not allowed validation
 */
export const notNumberRegex = /^([^0-9]*)$/;

/**
 * amount regex
 */
export const amountRegex = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

/**
 * percentage regex
 */
export const percentageRegex = /(^100(\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\.[0-9]{1,2}|\.)?$)/;
/**
/**
 * positive decimal regex
 */
export const positiveDecimal = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;
/**
 * alphabet validation
 */

export const alphabetRegex = /^[A-Za-z]+$/;

/**
 * mobile number regx
 */

export const mobileInputRegex = /^[9]\d{0,9}$/;

/**
 * land line number regx
 */

export const landLineInputRegex = /^\d{0,9}$/;

/**
 * nepali mobile number validation
 */

export const mobileNumberRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}/;

/**
 * land line mobile number validation
 */

export const landLineNumberRegex = /(?:\(?\+977\)?)?(0?[1-99]{1,2})?[-]?[0-9]{7}/;

/**
 * nepali phone number validation (landline / mobile)
 */

export const phoneNumberRegex =
  /([A-Z])\w+(?:\(?\+977\)?)?[9][6-9]\d{8}|(0?[1-99]{1,2})?[-]?[0-9]{7}/;
