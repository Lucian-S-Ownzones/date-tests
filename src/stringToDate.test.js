const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const moment = require('moment');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];
const invalidDates = ['notValid', null, 0, {}, undefined];

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

  test.only('moment conversion of invalid dates ', () => {
    expect(moment(invalidDates[0]).format('ll')).toEqual('Invalid date');
    expect(moment(invalidDates[1]).format('ll')).toEqual('Invalid date');
    expect(moment(invalidDates[2]).format('ll')).toEqual('Jan 1, 1970');
    expect(moment(invalidDates[3]).format('ll')).toEqual(moment().format('ll'));
    expect(moment(invalidDates[4]).format('ll')).toEqual(moment().format('ll'));
  });

  test.only('parseISO conversion of invalid dates ', () => {
    invalidDates.forEach((date) => {
      const d = parseISO(date);
      expect(d instanceof Date).toBeTruthy();
      expect(d.toString()).toEqual('Invalid Date');
    });
  });
});
