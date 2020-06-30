const moment = require('moment');
const isBefore = require('date-fns/isBefore');

const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const isWithinInterval = require('date-fns/isWithinInterval');
const parseISO = require('date-fns/parseISO');

const SecondOfJune = new Date(2020, 5, 2);
const SecondOfApril = new Date(2020, 3, 2);

const datesBefore = [
  'Tue May 05 2020 03:00:00 GMT+0300',
  'Mon Apr 27 2020 03:00:00 GMT+0300',
];
const datesAfter = [
  'Thu Jun 25 2020 03:00:00 GMT+0300',
  'Sat Jul 11 2020 03:00:00 GMT+0300',
];

moment.locale('en-gb');

describe.skip('comparison function, before, after D date', () => {
  test('input date is correct', () => {
    expect(SecondOfJune.getMonth()).toEqual(5);
    expect(SecondOfJune.getFullYear()).toEqual(2020);
    expect(SecondOfJune.getDay()).toEqual(2);

    expect(moment(SecondOfJune).day()).toEqual(2);
  });

  test('isBefore comparison ', () => {
    datesBefore.concat(datesAfter).forEach((date, i) => {
      const m = moment(new Date(date)).isBefore(SecondOfJune);
      const d = isBefore(new Date(date), SecondOfJune);
      expect(m).toEqual(d);
    });
  });
});

describe('between comparison', () => {
  test('moment.isBetween === isWithinInterval() ', () => {
    const m = moment(SecondOfJune).isBetween(
      new Date(datesBefore[0]),
      new Date(datesAfter[0])
    );
    const d = isWithinInterval(SecondOfJune, {
      start: new Date(datesBefore[0]),
      end: new Date(datesAfter[0]),
    });
    expect(d).toBeTruthy();
    expect(m).toBeTruthy();
  });

  test('!isWithinInterval case ', () => {
    const d = isWithinInterval(SecondOfApril, {
      start: new Date(datesBefore[0]),
      end: new Date(datesAfter[0]),
    });
    expect(d).toBeFalsy();
  });
});

describe('distance express in words, not 100% the same', () => {
  const d1 = 'Tue May 05 2020 03:00:00 GMT+0300';
  test.skip('moment.fromNow() !=== formatDistanceToNow', () => {
    const m = moment(d1).fromNow();
    const d = formatDistanceToNow(new Date(d1));

    expect(m).toEqual(d);
  });
});
