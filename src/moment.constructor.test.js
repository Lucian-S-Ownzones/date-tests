const moment = require('moment');

describe('moment constructor ', () => {
  test('the moment constructor ', () => {
    const m = moment();
    const d = new Date();
    expect(d instanceof Date).toBeTruthy();
    expect(m instanceof moment).toBeTruthy();
    expect(m instanceof Date).toBeFalsy();
  });
});
