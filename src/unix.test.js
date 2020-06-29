const moment = require('moment');
const parseISO = require('date-fns/parseISO');
const getUnixTime = require('date-fns/getUnixTime');
const compose = require('lodash/fp/compose');

const getUnixTimeFromString = compose(getUnixTime, parseISO);

moment.locale('en-gb');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];

describe('moment().unix() && getUnixTime()', () => {
  test('should convert dates to number ', () => {
    dates.forEach((date) => {
      expect(Number.isInteger(moment(date).unix())).toBeTruthy();
      expect(Number.isInteger(getUnixTime(parseISO(date)))).toBeTruthy();
    });
  });
  test('getUnixTime(d) should equal moment(d).unix() ', () => {
    dates.forEach((date) => {
      expect(moment(date).unix()).toEqual(getUnixTimeFromString(date));
    });
  });
});
