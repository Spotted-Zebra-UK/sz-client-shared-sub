// Library without typings is used.
/* eslint-disable @typescript-eslint/no-explicit-any */
import validate from 'validate.js';

const nonEmptyStringValidator = (value: any, options: any): string | null => {
  const message = options.message || 'must be a non empty string';
  if (options.allowEmpty && (!validate.isDefined(value) || value === '')) {
    return null;
  }
  if (validate.isString(value) && !validate.isEmpty(value)) {
    return null;
  }

  return message;
};

validate.validators.nonEmptyString = nonEmptyStringValidator;

export default validate;
