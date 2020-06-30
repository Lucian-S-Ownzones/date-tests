const moment = require('moment');
const startOfSecond = require('date-fns/startOfSecond');
const parseISO = require('date-fns/parseISO');
const format = require('date-fns/format');

describe('moment constructor ', () => {
  test('the moment constructor ', () => {
    const m = moment();
    const d = new Date();
    expect(d instanceof Date).toBeTruthy();
    expect(m instanceof moment).toBeTruthy();
    expect(m.toString()).toEqual(format(d, 'pppp'));
  });
});
