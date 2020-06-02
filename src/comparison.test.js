const moment = require('moment');
const isBefore = require('date-fns/isBefore');

const SecondOfJune = new Date(2020, 5, 2);
const datesBefore = [
  'Tue May 05 2020 03:00:00 GMT+0300',
  'Mon Apr 27 2020 03:00:00 GMT+0300',
];
const datesAfter = [
  'Thu Jun 25 2020 03:00:00 GMT+0300',
  'Sat Jul 11 2020 03:00:00 GMT+0300',
];
moment.locale('en-gb');

describe('comparison function, before, after D date', () => {
  test('input date is correct', () => {
    expect(SecondOfJune.getMonth()).toEqual(5);
    expect(SecondOfJune.getFullYear()).toEqual(2020);
    expect(SecondOfJune.getDay()).toEqual(2);

    expect(moment(SecondOfJune).day()).toEqual(2);
  });

  test('isBefore comparison ', () => {
    datesBefore.concat(datesAfter).forEach((date, i) => {
      const m = moment(new Date(date)).isBefore(new Date());
      const d = isBefore(new Date(date), SecondOfJune);
      expect(m).toEqual(d);
    });
  });
});