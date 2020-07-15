const { predefinedFormats, formatDate } = require('./helper');
const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];

describe('testing the default formatting ', () => {
  test('checking long date format strings', () => {
    const { longDate } = predefinedFormats;
    expect(formatDate(dates[0], longDate)).toEqual('02 April 2020, 17:07');
    expect(formatDate(dates[1], longDate)).toEqual('14 May 2020, 14:12');
    expect(formatDate(dates[2], longDate)).toEqual('30 April 2020, 14:03');
    expect(formatDate(dates[3], longDate)).toEqual('29 April 2020, 17:47');
  });
});
