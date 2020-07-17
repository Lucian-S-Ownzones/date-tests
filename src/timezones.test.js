const momentTz = require('moment-timezone');
const { removeTimeZoneHoursDiff } = require('./helper');

const Fortaleza = 'America/Fortaleza';
const Minsk = 'Europe/Minsk';
const UTC = 'UTC';

const tenOfJuly = '2020-07-10 00:00';
const tenOfJulyV2 = new Date(2020, 6, 11);

describe('parsing in TZ ', () => {
  test('removing timezone from date', () => {
    const i = removeTimeZoneHoursDiff(tenOfJulyV2);
    expect(i).toEqual('2020-07-10');
  });

  describe('different Date parsing moment.utc().tz() vs moment.tz()', () => {
    const d1 = momentTz.tz(tenOfJuly, Fortaleza);
    const d2 = momentTz.tz(
      removeTimeZoneHoursDiff(tenOfJulyV2) + ' 00:00',
      Fortaleza
    );
    test('the format string shall show the timezone difference', () => {
      expect(tenOfJulyV2.getTimezoneOffset()).toEqual(-180);
      expect(d1.format()).toEqual('2020-07-10T00:00:00-03:00');
      expect(d2.format()).toEqual('2020-07-10T00:00:00-03:00');

      expect(d1.utc().format()).toEqual('2020-07-10T03:00:00Z');
      expect(d2.utc().format()).toEqual('2020-07-10T03:00:00Z');
    });

    test('different formats shall have the same timestamp value', () => {
      expect(new Date(d1.format()).getTime()).toEqual(
        new Date(d1.utc().format()).getTime()
      );
      expect(new Date(d1.format()).getTime()).toEqual(1594350000000);
    });

    test('the timezone.utc() with UTC, disregarding .tz()', () => {
      const d3 = momentTz.utc(tenOfJuly).tz(Fortaleza);

      expect(d1.unix()).toEqual(1594350000);
      expect(d3.unix()).toEqual(1594339200);
      expect(d1.unix()).not.toEqual(d3.unix());
    });

    test('timezone.tz() constructor will default to hour 00:00 if other is not provided', () => {
      expect(d1.unix()).toEqual(d2.unix());
    });
  });
  describe('Fortaleza timezone  (UTC-3) ', () => {
    const d = momentTz.utc(tenOfJuly).tz(Fortaleza);
    const dUTC = momentTz.utc(tenOfJuly).tz(UTC);

    test('momentTz.utc date constructor', () => {
      expect(d.format()).toEqual('2020-07-09T21:00:00-03:00');
      expect(d.utc().format()).toEqual('2020-07-10T00:00:00Z');
    });
    test('the new date shall have the correct timestamp', () => {
      expect(new Date(d).getTime()).toEqual(1594339200000);
      expect(new Date(dUTC).getTime()).toEqual(1594339200000);
    });
  });

  describe('momentTz.tz for  Minsk timezone (UTC+3)', () => {
    const d = momentTz.tz(tenOfJuly, Minsk);

    test('moment date format() shall be different than utc().format()', () => {
      expect(d.format()).toEqual('2020-07-10T00:00:00+03:00');
      expect(d.utc().format()).toEqual('2020-07-09T21:00:00Z');
    });

    test('dates should have the same timestamp for different formats', () => {
      const dDateLocal = new Date(d.format());
      expect(dDateLocal.getTime()).toEqual(1594328400000);

      const dDateUTC = new Date(d.utc().format());
      expect(dDateUTC.getTime()).toEqual(1594328400000);

      expect(dDateLocal.getTime()).toEqual(dDateUTC.getTime());
    });
  });
});
