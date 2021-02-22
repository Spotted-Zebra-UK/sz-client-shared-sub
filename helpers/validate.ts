// Library without typings is used.
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import validate from 'validate.js';
import {
  DATE_FORMAT_DATE,
  DATE_FORMAT_DATE_TIME,
} from '../constants/dateFormats';

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

validate.extend(validate.validators.datetime, {
  parse: (value: string) => {
    return +moment.utc(value);
  },

  format: (value: string, options: { dateOnly: boolean }) => {
    var format = options.dateOnly ? DATE_FORMAT_DATE : DATE_FORMAT_DATE_TIME;
    return moment.utc(value).format(format);
  },
});

validate.validators.nonEmptyString = nonEmptyStringValidator;

export default validate;
