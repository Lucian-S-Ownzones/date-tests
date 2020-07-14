const momentTz = require('moment-timezone');
const { removeTimeZoneHoursDiff } = require('./helper');

const Fortaleza = 'America/Fortaleza';
const Minsk = 'Europe/Minsk';

const tenOfJuly = '2020-07-10 00:00';
const tenOfJulyV2 = new Date(2020, 6, 11);

describe('parsing in TZ ', () => {
  test('removing timezone from date', () => {
    const i = removeTimeZoneHoursDiff(tenOfJulyV2);
    expect(i).toEqual('2020-07-10');
  });

  test('parsing to Fortaleza', () => {
    const d1 = momentTz.tz(tenOfJuly, Fortaleza);
    const d2 = momentTz.tz(
      removeTimeZoneHoursDiff(tenOfJulyV2) + ' 00:00',
      Fortaleza
    );

    expect(typeof d1).toBe('object');
    expect(tenOfJulyV2.getTimezoneOffset()).toEqual(-180);
    expect(d1.format()).toEqual('2020-07-10T00:00:00-03:00');
    expect(d2.format()).toEqual('2020-07-10T00:00:00-03:00');

    expect(d1.utc().format()).toEqual('2020-07-10T03:00:00Z');
    expect(d2.utc().format()).toEqual('2020-07-10T03:00:00Z');

    expect(new Date(d1.format()).getTime()).toEqual(
      new Date(d1.utc().format()).getTime()
    );
    expect(new Date(d1.format()).getTime()).toEqual(1594350000000);
    expect(d1.unix()).toEqual(1594350000);
    expect(d2.unix()).toEqual(1594350000);
  });

  test('momentTz.utc creator based on timezone ', () => {
    const d = momentTz.utc(tenOfJuly).tz(Fortaleza);
    expect(d.format()).toEqual('2020-07-09T21:00:00-03:00');
    expect(d.utc().format()).toEqual('2020-07-10T00:00:00Z');
  });

  test('Minsk hour parser', () => {
    const d = momentTz.tz(tenOfJuly, Minsk);
    expect(d.format()).toEqual('2020-07-10T00:00:00+03:00');
    expect(d.utc().format()).toEqual('2020-07-09T21:00:00Z');

    const dDateLocal = new Date(d.format());
    expect(dDateLocal.getTime()).toEqual(1594328400000);

    const dDateUTC = new Date(d.utc().format());
    expect(dDateUTC.getTime()).toEqual(1594328400000);

    expect(dDateLocal.getTime()).toEqual(dDateUTC.getTime());
  });
});
