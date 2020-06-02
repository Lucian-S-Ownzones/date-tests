const moment = require('moment');

describe('testing moment and Date', () => {
  test('moment constructor ', () => {
    const m = moment();
    const d = new Date();
    expect(m.day()).toEqual(d.getDay());
  });
});
