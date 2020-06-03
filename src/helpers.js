const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');

const dateFormatter = (date, ...args) => {
  let d = date instanceof Date ? date : parseISO(date);
  if (!(d instanceof Date) || d.toString() === 'Invalid Date') {
    return d.toString();
  }

  return format(d, ...args);
};

module.exports = {
  dateFormatter,
};
