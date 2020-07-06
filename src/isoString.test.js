const moment = require('moment');
const startOfDay = require('date-fns/startOfDay');

moment.locale('en-gb');

const formatToISO = (date) => {
  const toIsoDate = new Date(date);
  return startOfDay(toIsoDate).toISOString();
};

describe('ISO string tests', () => {
  const dates = [
    'Wed Jun 11 2020 00:00:00 GMT+0300 (Eastern European Summer Time)',
    'Tue Jun 02 2020 15:48:17 GMT+0300 (Eastern European Summer Time)',
    '05 October 2011 14:48 UTC',
    '01 October 2011 00:00 UTC',
  ];

  const isoDatesOutput = ['2020-06-10T21:00:00.000Z'];

  test("startOf('day').toISOString()", () => {
    dates.forEach((date) => {
      const toIsoDate = new Date(date);
      const m = moment(toIsoDate).startOf('day').toISOString();
      const output = formatToISO(date);

      expect(m).toEqual(output);
    });
  });

  test('startOfDay iso formatting ', () => {
    const input = formatToISO(dates[0]);
    const output = '2020-06-10T21:00:00.000Z';

    const input1 = formatToISO(dates[2]);
    const output1 = '2011-10-04T21:00:00.000Z';
    expect(input).toEqual(output);
    expect(input1).toEqual(output1);
  });
});
