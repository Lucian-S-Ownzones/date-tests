const isValid = require('date-fns/isValid');
const format = require('date-fns/format');

const dateFormatter = (date, ...args) => {
  let d = date;
  if (!(date instanceof Date)) {
    d = new Date(date);
  }

  if (!isValid(d)) return 'Invalid date';

  return format(d, ...args);
};

module.exports = {
  dateFormatter,
};
