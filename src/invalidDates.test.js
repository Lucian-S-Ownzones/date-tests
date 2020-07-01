const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const moment = require('moment');

const validDates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];
const invalidDates = [
  'notValid',
  null,
  0,
  {},
  undefined,
  '',
  false,
  'Thu Jun 25 2020 03:00:00 GMT+0300',
  'Sat Jul 11 2020 03:00:00 GMT+0300',
];

describe('moment && date-fns invalid date formatting', () => {
  test("string check, will fill console warn: date-fns doesn't accept strings as arguments", () => {
    validDates.forEach((date) => {
      expect(() => format(date, 'ii')).toThrow();
      expect(() => moment(date).format('ll')).not.toThrow();
    });
  });
  test('parseISO check for valid strings', () => {
    validDates.forEach((date) => {
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

  test('moment conversion of invalid dates ', () => {
    expect(moment(invalidDates[0]).format('ll')).toEqual('Invalid date');
    expect(moment(invalidDates[1]).format('ll')).toEqual('Invalid date');
    expect(moment(invalidDates[2]).format('ll')).toEqual('Jan 1, 1970');
    expect(moment(invalidDates[3]).format('ll')).toEqual(moment().format('ll'));
    expect(moment(invalidDates[4]).format('ll')).toEqual(moment().format('ll'));
  });

  test('parseISO conversion of invalid dates ', () => {
    invalidDates.forEach((date) => {
      const d = parseISO(date);
      expect(d instanceof Date).toBeTruthy(); // each parse returns an instance of Date
      expect(d.toString()).toEqual('Invalid Date');
    });
  });
});
