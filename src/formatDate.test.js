const { formatDate } = require('./helper');

const moment = require('moment');
moment.locale('en-gb');
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
  Symbol('date'),
];

describe('formatDate wrapper', () => {
  test('invalid dates shall return null', () => {
    invalidDates.forEach((iD, i) => {
      if (i !== 2) {
        expect(formatDate(iD, 'y')).toEqual(null);
      } else {
        expect(formatDate(iD, 'y')).toEqual('1970');
      }
    });
  });

  test("moment.format('lll'); ===  dateFormatter('d MMM Y HH:mm')", () => {
    validDates.map((date) => {
      const m = moment(date).format('lll');
      const d = formatDate(date, 'd MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });
});
