
export const CARD_NUMBER_REGEX = /^(?:(?:(?:4[0-9]{12}(?:[0-9]{3})?)|(?:5[1-5][0-9]{14})|(?:6(?:011|5[0-9][0-9])[0-9]{12})|(?:3[47][0-9]{13})|(?:3(?:0[0-5]|[68][0-9])[0-9]{11}))|[0-9]{13,16})$/;
export const EMAIL_REGEX = /^(?=.{5,100}$)[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.es)$/;
export const CVV_REGEX = /^(?:(?:\d{3,4})|((4\d{2})|(5[1-5]\d{2}))|4532)$/;
export const EXP_MONTH_REGEX = /^(0?[1-9]|1[0-2])$/;
export const EXP_YEAR_REGEX = /^(?:\d{4})$|^20[2-6][0-9]$/;
export const TOKEN_REGEX = /^.{16}$/;