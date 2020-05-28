const isValid = require('date-fns/isValid');
const format = require('date-fns/format');

const formatGuard = (date, ...args) => {
  if (!isValid(date)) return 'Invalid date';
  return format(date, ...args);
};

module.exports = {
  formatGuard,
};
