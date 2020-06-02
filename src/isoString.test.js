const moment = require('moment');
const startOfDay = require('date-fns/startOfDay');

moment.locale('en-gb');

describe('ISO string tests', () => {
  const dates = [
    'Wed Jun 11 2020 00:00:00 GMT+0300 (Eastern European Summer Time)',
    'Tue Jun 02 2020 15:48:17 GMT+0300 (Eastern European Summer Time)',
    '05 October 2011 14:48 UTC',
    '01 October 2011 00:00 UTC',
  ];

  test("startOf('day').toISOString()", () => {
    dates.forEach((date) => {
      const toIsoDate = new Date(date);
      const m = moment(toIsoDate).startOf('day').toISOString();

      expect(m).toEqual(startOfDay(toIsoDate).toISOString());
    });
  });
});
