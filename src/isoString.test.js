const moment = require('moment');
const startOfDay = require('date-fns/startOfDay');
const { formatISO, endOfDay } = require('date-fns');

moment.locale('en-gb');

const formatToISO = (fn) => (date) => {
  const toIsoDate = new Date(date);
  return fn(toIsoDate).toISOString();
};

const startOfDayToISO = formatToISO(startOfDay);
const endOfDayToISO = formatToISO(endOfDay);

describe('ISO string tests', () => {
  const dates = [
    'Wed Jun 11 2020 00:00:00 GMT+0300 (Eastern European Summer Time)',
    'Tue Jun 02 2020 15:48:17 GMT+0300 (Eastern European Summer Time)',
    '05 October 2011 14:48 UTC',
    '01 October 2011 00:00 UTC',
    'Wed Jul 22 2020 00:00:00 GMT+0300 (Eastern European Summer Time)',
  ];

  test("moment(<date>).startOf('day').toISOString() === startOfDayToISO  ", () => {
    dates.forEach((date) => {
      const toIsoDate = new Date(date);
      const m = moment(toIsoDate).startOf('day').toISOString();
      const output = startOfDayToISO(date);

      expect(m).toEqual(output);
    });
  });

  test("moment(<date>).startOf('day').toISOString() === endOfDayToISO  ", () => {
    dates.forEach((date) => {
      const toIsoDate = new Date(date);
      const m = moment(toIsoDate).endOf('day').toISOString();
      const output = endOfDayToISO(date);

      expect(m).toEqual(output);
    });
  });

  describe('startOfDayToISO to string formatting check', () => {
    test('format "dates[0]"', () => {
      const input = startOfDayToISO(dates[0]);
      const output = '2020-06-10T21:00:00.000Z';

      expect(input).toEqual(output);
    });

    test('format "dates[2]"', () => {
      const input1 = startOfDayToISO(dates[2]);
      const output1 = '2011-10-04T21:00:00.000Z';
      expect(input1).toEqual(output1);
    });
  });
});
