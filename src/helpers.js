const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');

const dateFormatter = (date, ...args) => {
  try {
    const d = parseISO(date);
    if (d.toString() !== 'Invalid Date') return format(d, ...args);
    return d.toString();
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  dateFormatter,
};
