const moment = require('moment');
const isValid = require('date-fns/isValid');
const parseISO = require('date-fns/parseISO');
const { isValidDate } = require('./helper');

moment.locale('en-gb');

const invalidDates1 = ['2020-13-39', null, false];
const invalidDates2 = [undefined, 0, 1, {}];

describe('valid or string', () => {
  test('moment should identify invalid dates', () => {
    invalidDates1.forEach((iD) => {
      const date = moment(iD);

      expect(date.isValid()).toBeFalsy();
    });
  });

  test('moment `undefined` is parsed to valid date', () => {
    invalidDates2.forEach((iD) => {
      const date = moment(iD);

      expect(date.isValid()).toBeTruthy();
    });
  });

  test('date-fns check validity ', () => {
    [...invalidDates1, ...invalidDates2].forEach((iD) => {
      expect(isValid(parseISO(iD))).toBeFalsy();
      expect(isValidDate(iD)).toBeFalsy();
    });
  });
});
