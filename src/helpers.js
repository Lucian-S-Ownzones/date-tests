const { enGB } = require('date-fns/locale');

const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');

const dateFormatter = (date, formatString, options = { locale: enGB }) => {
  const inputIsDate = date instanceof Date;
  let d = inputIsDate ? date : parseISO(date);
  if (!inputIsDate || d.toString() === 'Invalid Date') {
    return d.toString();
  }

  return format(d, formatString, options);
};

module.exports = {
  dateFormatter,
};
