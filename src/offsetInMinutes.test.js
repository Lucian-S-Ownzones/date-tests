const moment = require('moment');
const add = require('date-fns/add');
const { format } = require('date-fns');
const { parseISO2 } = require('./helper');

const toUTC = (date) => {
  const minOffset = date.getTimezoneOffset() * -1;
  const result = add(date, { minutes: minOffset });
  return result;
};

const moveTimeZoneToUTC = (d) => {
  const offsetMinutes = moment().utcOffset();

  return moment(d).add(offsetMinutes, 'm').toISOString();
};

const removeTimeZoneHoursDiff = (date, addTimeZoneDiff) => {
  if (addTimeZoneDiff) {
    return moment(date)
      .add(date.getTimezoneOffset() * -1, 'm')
      .format('YYYY-MM-DD');
  }
  return moment(date).format('YYYY-MM-DD');
};

const removeTimeZoneHoursDiff_d = (date, addTimeZoneDiff) => {
  if (addTimeZoneDiff) {
    return format(toUTC(parseISO2(date)), 'yyyy-MM-dd');
  }
  return format(parseISO2(date), 'yyyy-MM-dd');
};

describe('offset in minutes calc', () => {
  test('calculate min offset based on UTC', () => {
    const d = new Date();
    const refDate = '2020-06-30T00:00:00.000Z';
    const offsetMinutes = moment().utcOffset();
    const offsetRef = moment(refDate).utcOffset();
    if (process.env.TZ === 'America/Havana') {
      expect(offsetMinutes).toEqual(-300);
      expect(d.getTimezoneOffset()).toEqual(300);
      expect(offsetRef).toEqual(-240);
    }
  });

  test('getTimezoneOffset gets reversed value of moment().utcOffset()', () => {
    if (process.env.TZ === 'Europe/Bucharest') {
      const d = new Date(2020, 1, 2);
      expect(moment(d).utcOffset()).toEqual(120);
      expect(d.getTimezoneOffset()).toEqual(-120);
    }

    if (process.env.TZ === 'Cuba/Havana') {
      expect(moment().utcOffset()).toEqual(-300);
      expect(d.getTimezoneOffset()).toEqual(300);
    }
  });

  test('utc conversion equivalence', () => {
    const d = new Date(2020, 1, 2);
    const d1 = new Date(2019, 1, 2, 20, 22);

    expect(moveTimeZoneToUTC(d)).toEqual('2020-02-02T00:00:00.000Z');
    expect(toUTC(d).toISOString()).toEqual('2020-02-02T00:00:00.000Z');

    expect(moveTimeZoneToUTC(d1)).toEqual('2019-02-02T20:22:00.000Z');
    expect(toUTC(d1).toISOString()).toEqual('2019-02-02T20:22:00.000Z');
  });

  test('removeTimeZoneHoursDiff() output', () => {
    const d = new Date(2020, 1, 2);
    const d1 = new Date(2019, 1, 2, 20, 22); // havan diff 300min -4h --> next day 02-03 in UTC
    if (process.env.TZ === 'Cuba/Havana') {
      expect(removeTimeZoneHoursDiff(d, true)).toEqual('2020-02-01');
      expect(removeTimeZoneHoursDiff(d1, true)).toEqual('2019-02-02');

      expect(removeTimeZoneHoursDiff(d, false)).toEqual('2020-02-02');
      expect(removeTimeZoneHoursDiff(d1, false)).toEqual('2019-02-02');
    }
  });

  test('removeTimeZoneHoursDiff_d() output', () => {
    const d = new Date(2020, 1, 2);
    const d1 = new Date(2019, 1, 2, 20, 22); // havan diff 300min -4h --> next day 02-03 in UTC
    const e = new Date(2020, 10, 3, 18, 2);

    expect(d.getMonth()).toEqual(1);
    expect(d.getDay()).toEqual(0);
    if (process.env.TZ === 'Cuba/Havana') {
      expect(removeTimeZoneHoursDiff_d(d, true)).toEqual('2020-02-01');
      expect(removeTimeZoneHoursDiff_d(d1, true)).toEqual('2019-02-02');
      expect(removeTimeZoneHoursDiff_d(e, true)).toEqual('2020-11-03');

      expect(removeTimeZoneHoursDiff_d(d, false)).toEqual('2020-02-02');
      expect(removeTimeZoneHoursDiff_d(d1, false)).toEqual('2019-02-02');
    }
  });
});
