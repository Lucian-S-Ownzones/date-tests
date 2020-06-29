const moment = require('moment');
const parseISO = require('date-fns/parseISO');
const getDay = require('date-fns/getDay');

describe('moment converting string to date', () => {
  const dates = [
    '2020-04-02T14:07:14.045Z',
    '2020-05-14T11:12:45.625Z',
    '2020-04-30T11:03:56.341Z',
    '2020-04-29T14:47:55.379Z',
  ];
  test('moment.toDate() === parseISO()', () => {
    dates.forEach((date) => {
      const m = moment(date).toDate();
      const d = parseISO(date);

      expect(m instanceof Date).toBeTruthy();
      expect(d instanceof Date).toBeTruthy();

      expect(m.getDay()).toEqual(getDay(d));
      expect(m.getDay()).toEqual(d.getDay());
    });
  });
});
