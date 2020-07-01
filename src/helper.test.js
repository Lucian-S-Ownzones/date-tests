const parseISO = require('date-fns/parseISO');
const locale = require('date-fns/locale');

const { ru } = locale;

const {
  dateFormatter,
  isValidDate,
  dateFormatterMessage,
} = require('./helper');

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
const secondOfApril = '2020-04-02T14:07:14.045Z';
const firstOfMay = '2020-05-01T20:07:14.045Z';
const secondOfMay = '2020-05-02';
const invalidMonth = '2020-15-02';
const aString = 'aString';

describe('using dateFormatter with Date parameter', () => {
  test('date-fns/parseISO fails to parse a Date type ', () => {
    expect(() => parseISO(secondOfJune)).not.toThrow();
    expect(parseISO(secondOfJune) instanceof Date).toBeTruthy();
    expect(parseISO(secondOfJune).toString()).toEqual('Invalid Date');
  });

  test("dateFormatter returns 'Invalid Date' for invalid dates", () => {
    invalidDates.forEach((date) => {
      expect(dateFormatter(date, 'Y')).toEqual('Invalid Date');
    });
  });

  test('dateFormatter formats correct date inputs ', () => {
    expect(dateFormatter(secondOfJune, 'dd MM')).toEqual('02 06');
    expect(dateFormatter(t23ofAugust, 'dd MM')).toEqual('23 08');
    expect(dateFormatter(t23ofAugust, 'dd MMM')).toEqual('23 Aug');
  });

  test('formatting to different locale', () => {
    const toDayMonthRussian = (date) => {
      return dateFormatter(date, 'dd MMMM', { locale: ru });
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
  test('dateFormatter should return DAY name, with optional locale', () => {
    expect(dateFormatter(secondOfApril, 'EEEE')).toEqual('Thursday');
    expect(dateFormatter(secondOfMay, 'EEEE')).toEqual('Saturday');

    expect(dateFormatter(secondOfApril, 'EEEE', { locale: ru })).toEqual(
      'четверг'
    );
    expect(dateFormatter(secondOfMay, 'EEEE', { locale: ru })).toEqual(
      'суббота'
    );
  });

  test('dateFormatter should return MONTH name, with optional locale', () => {
    expect(dateFormatter(secondOfApril, 'LLLL')).toEqual('April');
    expect(dateFormatter(secondOfMay, 'LLLL')).toEqual('May');

    expect(dateFormatter(secondOfApril, 'LLLL', { locale: ru })).toEqual(
      'апрель'
    );
    expect(dateFormatter(secondOfMay, 'LLLL', { locale: ru })).toEqual('май');
  });

  test('dateFormatter should return `Invalid Date` for incorrect date string ', () => {
    expect(dateFormatter(invalidMonth, 'LLLL')).toEqual('Invalid Date');
    expect(dateFormatter(aString, 'LLLL')).toEqual('Invalid Date');

    expect(dateFormatter(invalidMonth, 'LLLL', { locale: ru })).toEqual(
      'Invalid Date'
    );
  });
});

describe('isValidDate ', () => {
  test('isValidDate check shall return false for invalid inputs', () => {
    invalidDates.forEach((date) => {
      expect(isValidDate(date)).toEqual(false);
    });
  });
  test('isValidDate check shall return true for correct values', () => {
    const secondOfMay = '2020-05-02';

    expect(isValidDate(secondOfJune)).toEqual(true);
    expect(isValidDate(t23ofAugust)).toEqual(true);
    expect(isValidDate(secondOfMay)).toEqual(true);
  });
});

describe('dateFormatter output custom message for invalid dates', () => {
  const NOT_VALID = 'NOT VALID!';
  const formatCustom = dateFormatterMessage(NOT_VALID);

  test(`it should show ${NOT_VALID} `, () => {
    invalidDates.forEach((date) => {
      expect(formatCustom(date, 'Y')).toEqual(NOT_VALID);
    });
  });

  test('it should format properly correct dates', () => {
    expect(formatCustom(secondOfJune, 'dd MM')).toEqual('02 06');
    expect(formatCustom(t23ofAugust, 'dd MM')).toEqual('23 08');
    expect(formatCustom(t23ofAugust, 'dd MMM')).toEqual('23 Aug');
  });
});

describe('dateFormater expected outputs', () => {
  test('dateFormatter(<date>, "dd/MM/Y")', () => {
    const input = dateFormatter(secondOfJune, 'dd/MM/Y');
    const output = '02/06/2020';

    expect(input).toEqual(output);
  });

  test('dateFormatter(<date>, "d MMM Y HH:mm")', () => {
    const input = dateFormatter(secondOfApril, 'd MMM Y HH:mm');
    const input2 = dateFormatter(firstOfMay, 'd MMM Y HH:mm');

    const output = '2 Apr 2020 17:07';
    const output2 = '1 May 2020 23:07';

    expect(input).toEqual(output);
    expect(input2).toEqual(output2);
  });

  test('dateFormatter(<date>, "d MMMM Y HH:mm")', () => {
    const input = dateFormatter(secondOfApril, 'd MMMM Y HH:mm');
    const input2 = dateFormatter(firstOfMay, 'd MMMM Y HH:mm');

    const output = '2 April 2020 17:07';
    const output2 = '1 May 2020 23:07';

    expect(input).toEqual(output);
    expect(input2).toEqual(output2);
  });

  test('dateFormatter(<date>, "EEEE, d MMMM Y HH:mm)', () => {
    const input = dateFormatter(secondOfApril, 'EEEE, d MMMM Y HH:mm');
    const input2 = dateFormatter(firstOfMay, 'EEEE, d MMMM Y HH:mm');

    const output = 'Thursday, 2 April 2020 17:07';
    const output2 = 'Friday, 1 May 2020 23:07';

    expect(input).toEqual(output);
    expect(input2).toEqual(output2);
  });
});
