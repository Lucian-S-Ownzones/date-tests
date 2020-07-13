var isValid = require('date-fns/isValid');
const { parseISO, format } = require('date-fns');

describe('using isValid', () => {
  test('running isValid with Date arguments, should return true', () => {
    const i = new Date(2019, 9, 1);
    expect(isValid(i)).toBeTruthy();
  });
  test('running isValid against string should fail', () => {
    const i = '2020-07-15T21:00:00Z';
    expect(isValid(i)).toBeFalsy();
  });
  test('parsed string shall be validated ', () => {
    const i = '2020-07-15T21:00:00Z';

    expect(isValid(parseISO(i))).toBeTruthy();
    expect(typeof parseISO(i)).not.toEqual(Date);
    expect(parseISO(i).getFullYear()).toEqual(2020);
    expect(parseISO(i).getMonth()).toEqual(6);
  });

  test('parsed invalid string shall NOT validated ', () => {
    const i = '2020-MAY-15T21:00:00Z';

    expect(isValid(parseISO(i))).toBeFalsy();
    expect(parseISO(i).toString()).toEqual('Invalid Date');
  });

  test('validates not valid Date formats ', () => {
    const i = new Date(2019, 13, 2);
    expect(isValid(i)).toBeTruthy();
    expect(i.getFullYear()).toEqual(2020);
  });
});
