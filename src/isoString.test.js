const moment = require('moment');
moment.locale('en-gb');

describe('ISO string tests', () => {
  test("startOf('day').toISOString()", () => {
    const isoString =
      'Wed Jun 11 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
    const toIsoDate = new Date(isoString);
    const m = moment(toIsoDate).startOf('day').toISOString();

    expect(m).toEqual(toIsoDate.toISOString());
  });
});
