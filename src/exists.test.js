const moment = require('moment');
const dateFns = require('date-fns');

describe('lib exist', () => {
  test('moment', () => {
    expect(typeof moment).toBe('function');
  });
  test('dateFns', () => {
    expect(typeof dateFns).toBe('object');
  });
});
