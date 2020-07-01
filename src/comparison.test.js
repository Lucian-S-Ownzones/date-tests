const moment = require('moment');
const isBefore = require('date-fns/isBefore');
const isAfter = require('date-fns/isAfter');
const parseISO = require('date-fns/parseISO');

const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const isWithinInterval = require('date-fns/isWithinInterval');

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

const datesAfterFormat2 = [
  '2020-07-02T14:07:14.045Z',
  '2020-07-14T11:12:45.625Z',
  '2020-07-08T11:03:56.341Z',
  '2020-09-29T14:47:55.379Z',
];

moment.locale('en-gb');

describe('comparison function, before, after D date', () => {
  test('input date is correct', () => {
    expect(SecondOfJune.getMonth()).toEqual(5);
    expect(SecondOfJune.getFullYear()).toEqual(2020);
    expect(SecondOfJune.getDay()).toEqual(2);

    expect(moment(SecondOfJune).day()).toEqual(2);
  });

  test('moment.isBefore === date-fns.isBefore()', () => {
    datesBefore.forEach((date) => {
      const m = moment(new Date(date)).isBefore(SecondOfJune);
      const d = isBefore(new Date(date), SecondOfJune);
      expect(d).toBeTruthy();
      expect(m).toEqual(d);
    });

    datesAfter.forEach((date) => {
      const m = moment(new Date(date)).isBefore(SecondOfJune);
      const d = isBefore(new Date(date), SecondOfJune);
      expect(d).toBeFalsy();
      expect(m).toEqual(d);
    });
  });

  test('moment.isAfter === date-fns.isAfter(new Date, ...) ', () => {
    datesAfter.forEach((date, i) => {
      const m = moment(new Date(date)).isAfter(SecondOfJune);
      const d = isAfter(new Date(date), SecondOfJune);
      expect(m).toEqual(d);
    });
  });

  test('moment.isAfter === date-fns.isAfter(parseISO, ...) ', () => {
    datesAfterFormat2.forEach((date, i) => {
      const m = moment(new Date(date)).isAfter(SecondOfJune);
      const d = isAfter(parseISO(date), SecondOfJune);
      expect(d).toBeTruthy();
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
