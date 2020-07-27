const moment = require('moment');
const { enGB } = require('date-fns/locale');

const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const isValid = require('date-fns/isValid');
const compose = (f, g) => (x) => f(g(x));

const dateFormatter = (date, formatString, options = { locale: enGB }) => {
  const inputIsDate = date instanceof Date;
  let d = inputIsDate ? date : parseISO(date);
  if (!d || d.toString() === 'Invalid Date') {
    return d.toString();
  }

  return format(d, formatString, options);
};

const dateFormatterMessage = (customMessage, invalid = 'Invalid Date') => {
  return (date, formatString, options) => {
    const dateValue = dateFormatter(date, formatString, options);
    if (dateValue === invalid) return customMessage;
    return dateValue;
  };
};

const isValidDate = compose(isValid, (d) =>
  d instanceof Date ? d : parseISO(d)
);

const formatDate = (date, formatString = 'dd MMM yyyy  HH:mm', ...args) => {
  if (typeof date === 'number') return null;
  const dateObject = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObject) ? format(dateObject, formatString, ...args) : null;
};

const defaultFormats = (formatString, ...args) =>
  formatDate(date, formatString, ...args);

const predefinedFormats = {
  longDate: 'dd MMMM Y, HH:mm',
};

const removeTimeZoneHoursDiff = (date) => {
  return moment(date).add(date.getTimezoneOffset(), 'm').format('YYYY-MM-DD');
};

module.exports = {
  dateFormatter,
  isValidDate,
  dateFormatterMessage,
  formatDate,
  removeTimeZoneHoursDiff,
  defaultFormats,
  predefinedFormats,
};
