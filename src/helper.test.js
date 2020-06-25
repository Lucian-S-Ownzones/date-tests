const format = require('date-fns/format');
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

describe('using dateFormatter', () => {
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

  test('formatting without formatString', () => {
    expect(() => dateFormatter(secondOfJune)).toThrow();
  });
});
