const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const moment = require('moment');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];
const invalidDates = ['notValid', null, 0, {}];

describe('moment ', () => {
  test('string check', () => {
    dates.forEach((date) => {
      expect(() => format(date, 'ii')).toThrow();
      expect(() => moment(date).format('ll')).not.toThrow();
    });
  });
  test('parseISO check for valid strings', () => {
    dates.forEach((date) => {
      expect(() => format(parseISO(date), 'ii')).not.toThrow();
      expect(() => moment(date).format('ll')).not.toThrow();
    });
  });
  test('parseISO and format invalid string', () => {
    invalidDates.forEach((date) => {
      expect(() => format(parseISO(date), 'ii')).toThrow();
      expect(() => moment(date).format('ll')).not.toThrow();
    });
  });
});
