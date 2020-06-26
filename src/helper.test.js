const parseISO = require('date-fns/parseISO');
const locale = require('date-fns/locale');

const { dateFormatter } = require('./helpers');

const invalidDates = [
  'notValid',
  null,
  0,
  {},
  undefined,
  '',
  false,
  '2020/13/33',
];
const secondOfJune = new Date(2020, 5, 2);
const t23ofAugust = new Date(1944, 7, 23);

describe('using dateFormatter with Date parameter', () => {
  test('date-fns/parseISO fails to parse a Date type ', () => {
    expect(() => parseISO(secondOfJune)).not.toThrow();
    expect(parseISO(secondOfJune) instanceof Date).toBeTruthy();
    expect(parseISO(secondOfJune).toString()).toEqual('Invalid Date');
  });

  test("dateFormatter returns 'Invalid Date' for invalid dates", () => {
    invalidDates.forEach((date) => {
      expect(dateFormatter(date)).toEqual('Invalid Date');
    });
  });

  test('dateFormatter formats correct date inputs ', () => {
    expect(dateFormatter(secondOfJune, 'dd MM')).toEqual('02 06');
    expect(dateFormatter(t23ofAugust, 'dd MM')).toEqual('23 08');
    expect(dateFormatter(t23ofAugust, 'dd MMM')).toEqual('23 Aug');
  });

  test('formatting to different locale', () => {
    const toDayMonthRussian = (date) => {
      return dateFormatter(date, 'dd MMMM', { locale: locale.ru });
    };
    expect(toDayMonthRussian(t23ofAugust)).toEqual('23 августа');
    expect(toDayMonthRussian(secondOfJune)).toEqual('02 июня');
  });

  test('formatting without a formatString will throw', () => {
    expect(() => dateFormatter(secondOfJune)).toThrow();
    expect(() => dateFormatter(t23ofAugust)).toThrow();
  });
});

describe('dateFormatter using `string-date` parameter', () => {
  const secondOfApril = '2020-04-02T14:07:14.045Z';
  const secondOfMay = '2020-05-02';
  const invalidMonth = '2020-15-02';
  const aString = 'aString';

  test('dateFormatter should return DAY name, with optional locale', () => {
    expect(dateFormatter(secondOfApril, 'EEEE')).toEqual('Thursday');
    expect(dateFormatter(secondOfMay, 'EEEE')).toEqual('Saturday');

    expect(dateFormatter(secondOfApril, 'EEEE', { locale: locale.ru })).toEqual(
      'четверг'
    );
    expect(dateFormatter(secondOfMay, 'EEEE', { locale: locale.ru })).toEqual(
      'суббота'
    );
  });

  test('dateFormatter should return MONTH name, with optional locale', () => {
    expect(dateFormatter(secondOfApril, 'LLLL')).toEqual('April');
    expect(dateFormatter(secondOfMay, 'LLLL')).toEqual('May');

    expect(dateFormatter(secondOfApril, 'LLLL', { locale: locale.ru })).toEqual(
      'апрель'
    );
    expect(dateFormatter(secondOfMay, 'LLLL', { locale: locale.ru })).toEqual(
      'май'
    );
  });

  test('dateFormatter should return `Invalid Date` for incorrect date string ', () => {
    expect(dateFormatter(invalidMonth, 'LLLL')).toEqual('Invalid Date');
    expect(dateFormatter(aString, 'LLLL')).toEqual('Invalid Date');

    expect(dateFormatter(invalidMonth, 'LLLL', { locale: locale.ru })).toEqual(
      'Invalid Date'
    );
  });
});
