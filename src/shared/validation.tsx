import { ValidationType } from './interfaces';

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateControl = (
  value: string,
  validation: ValidationType,
  password?: string | null
) => {
  if (!validation) {
    return true;
  }

  let isValid: boolean = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.email) {
    isValid = !!(validateEmail(value) && isValid);
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }

  if (validation.isEqual) {
    isValid = value === password && isValid;
  }

  return isValid;
};
