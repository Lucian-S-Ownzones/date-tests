const moment = require('moment');

describe('moment constructor ', () => {
  test('the moment constructor ', () => {
    const m = moment();
    const d = new Date();
    expect(d instanceof Date).toBeTruthy();
    expect(m instanceof moment).toBeTruthy();
    expect(m instanceof Date).toBeFalsy();
  });
  test('new Date() gets the same year/month/day HH:mm as moment', () => {
    // second is hard to test as they will run at slightly diff times
    const input = moment();
    const output = new Date();

    expect(input.day()).toEqual(output.getDay());
    expect(input.month()).toEqual(output.getMonth());
    expect(input.year()).toEqual(output.getFullYear());
    expect(input.hour()).toEqual(output.getHours());
    expect(input.minute()).toEqual(output.getMinutes());
  });
});
