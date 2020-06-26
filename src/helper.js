const { enGB } = require('date-fns/locale');

const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const isValid = require('date-fns/isValid');
const compose = require('lodash/fp/compose');

const dateFormatterFallback = (message) => {
  return (date, formatString, options) =>
    dateFormatter(date, formatString, options, message);
};

const dateFormatter = (
  date,
  formatString,
  options = { locale: enGB },
  invalidMessage
) => {
  const inputIsDate = date instanceof Date;
  let d = inputIsDate ? date : parseISO(date);
  if (!d || d.toString() === 'Invalid Date') {
    return invalidMessage || d.toString();
  }

  return format(d, formatString, options);
};

const isValidDate = compose(isValid, (d) =>
  d instanceof Date ? d : parseISO(d)
);

module.exports = {
  dateFormatter,
  isValidDate,
  dateFormatterMessage: dateFormatterFallback,
};
