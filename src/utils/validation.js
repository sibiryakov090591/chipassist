/* eslint-disable no-bitwise */
/* eslint-disable consistent-return */
import validator from "validator";
import isPostalCode from "validator/es/lib/isPostalCode";
import logMessages from "../i18nDefault/logMessages";
// https://www.npmjs.com/package/validator
import { addhttp } from "./transformUrl";

const i18n = logMessages;

export function deepEqual(value1, value2) {
  // Handle primitive values
  if (value1 === value2) {
    return true;
  }

  // Handle arrays
  if (Array.isArray(value1) || Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }

    return value1.every((item, index) => deepEqual(item, value2[index]));
  }

  // Handle objects
  if (typeof value1 === "object" && value1 !== null && typeof value2 === "object" && value2 !== null) {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  // Handle type conversion for other cases
  // eslint-disable-next-line eqeqeq
  return value1 == value2;
}

export const isEmpty = (value) => value === undefined || value === null || value === "";
const join = (rules) => (value, data) =>
  rules.map((rule) => rule(value, data)).filter((error) => !!error)[0]; /* first error */

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
    return i18n.invalidEmail;
  }
}

export const isInvalidNumber = (value) => isEmpty(value) || value.length !== 11;

export const isInvalidCardNumber = (value) => isEmpty(value) || value.length !== 16;

export const isInvalidMonth = (value) => isEmpty(value) || value.length !== 2;

export const isInvalidYear = (value) => isEmpty(value) || value.length !== 2;

export const isInvalidCvc = (value) => isEmpty(value) || value.length !== 3;

export const isInvalidPostCode = (value, locale) => {
  try {
    const test = isPostalCode(value, locale);
    return !test;
  } catch (error) {
    return false;
  }
};

export function specialCharCheck(value) {
  const regExpWhiteList = /^[\w.+-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
  if (!regExpWhiteList.test(value)) {
    return i18n.invalidString;
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return i18n.required;
  }
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return Object.assign(i18n.minLength, { values: { min } });
    }
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return Object.assign(i18n.maxLength, { values: { max } });
    }
  };
}

export function space(value) {
  const blankPattern = /[\s]/g;
  if (blankPattern.test(value)) {
    return i18n.space;
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return i18n.integer;
  }
}

export function oneOf(enumeration) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return Object.assign(i18n.enumeration, {
        values: { enumerations: enumeration.join(", ") },
      });
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return i18n.donotmatch;
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function isFuncWork(func) {
  try {
    if (func && typeof func === "function") return true;
  } catch (err) {
    return false;
  }
  return false;
}

export function url(value) {
  if (!value) return i18n.invaludUrl;
  const httpUrl = addhttp(value);
  if (
    !validator.isURL(httpUrl, {
      protocols: ["http", "https"],
      allow_underscores: true,
    })
  ) {
    return i18n.invalidUrl;
  }
}

export function isUrl(value) {
  const res_url = String(value);
  if (
    !validator.isURL(res_url, {
      protocols: ["http", "https"],
      allow_underscores: true,
    })
  ) {
    return false;
  }
  return true;
}
