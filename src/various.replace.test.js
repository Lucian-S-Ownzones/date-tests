const moment = require('moment');
const parseISO = require('date-fns/parseISO');
const { parseISO2 } = require('./helper');
const parse = require('date-fns/parse');
const format = require('date-fns/format');
const differenceInHours = require('date-fns/differenceInHours');
const differenceInSeconds = require('date-fns/differenceInSeconds');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');
const {
  differenceInMinutes,
  endOfDay,
  formatISO,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
} = require('date-fns');
const add = require('date-fns/add');
const sub = require('date-fns/sub');
const _flow = require('lodash/flow');

const starOfDay = require('date-fns/startOfDay');

/**
 * @param  {string} start
 * @param  {string} end
 */

const getDateDiff = (start, end) => {
  return {
    hours: differenceInHours(parseISO(end), parseISO(start)),
    minutes: differenceInMinutes(parseISO(end), parseISO(start)),
    seconds: differenceInSeconds(parseISO(end), parseISO(start)),
  };
};

describe('moment constructor', () => {
  test('moment and new Date() return same nr of ms (unix based)', () => {
    const m = moment();
    const d = new Date();
    const t = d.getTime().toString();
    expect(typeof m).toEqual('object');
    //ignore last significat digit;
    const mf = m.format('x');
    expect(mf.substr(0, mf.length - 1)).toEqual(t.substr(0, t.length - 1));
  });

  test('convert strings to date', () => {
    const end = '2020-09-09T06:02:58.544Z';

    const d = parseISO(end);
    const m = moment(end).format('x');

    expect(d.getTime().toString()).toEqual(m);
  });

  test('diff dates', () => {
    const start = '2020-09-07T08:38:48.917Z';
    const end = '2020-09-09T06:02:58.544Z';

    const d1 = parseISO2(start);
    const d2 = parseISO2(end);

    const duration = moment.duration(moment(end).diff(start));
    const parts = [
      Math.floor(duration.asHours()),
      moment.utc(duration.asMilliseconds()).format('mm:ss'),
    ];

    const partsD = [
      Math.floor(differenceInHours(d2, d1)),
      format(differenceInMilliseconds(d2, d1), 'mm:ss'),
    ];

    expect(parts).toEqual(partsD);
  });

  test('show diff in hours seconds etc', () => {
    const start = '2020-09-07T08:38:48.917Z';
    const end = '2020-09-09T06:02:58.544Z';

    const duration = moment.duration(moment(end).diff(moment(start)));

    const hoursM = parseInt(duration.asHours(), 10);
    const minutesM = parseInt(duration.asMinutes(), 10) % 60;
    const secondsM = parseInt(duration.asSeconds(), 10) % 60;

    const timeStr = `${hoursM}h${minutesM}m${secondsM}s`;

    const { hours, minutes, seconds } = getDateDiff(start, end);

    const hoursD = parseInt(hours);
    const minutesD = parseInt(minutes) % 60;
    const secondsD = parseInt(seconds) % 60;

    const timeStrD = `${hoursD}h${minutesD}m${secondsD}s`;

    expect(timeStr).toEqual('45h24m9s');
    expect(timeStr).toEqual(timeStrD);
  });

  test('should have the offset based on the timezone', () => {
    const refDate = '2020-06-30T00:00:00.000Z';

    const localTime = moment(refDate).format('YYYY-MM-DD hh:mm:ss');
    const utcTime = moment.utc(refDate).format('YYYY-MM-DD hh:mm:ss');
    const utcTimeDate = moment.utc(refDate, 'YYYY-MM-DD').toDate();

    const toUTC = (date) => {
      const d = parseISO(date);
      const minOffset = d.getTimezoneOffset();
      const result = add(d, { minutes: minOffset });
      return result;
    };

    const offsetInMinutes1 = parseISO(refDate).getTimezoneOffset();

    if (process.env.TZ === 'America/Havana') {
      expect(offsetInMinutes1).toEqual(240);

      expect(utcTime).toEqual('2020-06-30 12:00:00');
      expect(format(toUTC(refDate), 'Y-MM-dd hh:mm:ss')).toEqual(
        '2020-06-30 12:00:00'
      );
      expect(localTime).toEqual('2020-06-29 08:00:00');
    }
  });

  test("should extract  moment.utc(date, 'YYYY-MM-DD').toDate(); ", () => {
    const refD = new Date(2020, 8, 2, 23, 0, 0);
    const m = moment(refD)
      .add(refD.getTimezoneOffset(), 'm')
      .format('YYYY-MM-DD');

    expect(refD.getTimezoneOffset()).toEqual(240);
    expect(m).toEqual('2020-09-03');
  });
});

describe('current moment duration', () => {
  test('should calculate duration is seconds', () => {
    const currentTime = 3650;
    const currentMoment = moment.duration(currentTime, 's');
    const d = new Date(2020, 1, 1);

    const m = moment(d).startOf('day').add(currentMoment).format('HH:mm:ss');
    const formatTime = _flow(
      (d, currentTime) => add(starOfDay(d), { seconds: currentTime }),
      (d) => format(d, 'HH:mm:ss')
    );

    const df = add(starOfDay(d), { seconds: currentTime });

    expect(m).toEqual('01:00:50');
    expect(formatTime(d, currentTime)).toEqual('01:00:50');
  });

  test('converting to HH:mm', () => {
    const dateRef = new Date(2020, 10, 1, 15, 22, 0);
    const timeFromDate = moment(dateRef).format('HH:mm');
    const df = format(dateRef, 'HH:mm');

    expect(timeFromDate).toEqual('15:22');
    expect(df).toEqual('15:22');
  });

  test('end of day conversion', () => {
    const dateRef = '2020-09-09T06:00:00.00Z';

    const r = moment(dateRef).endOf('day');
    const exactR = moment(dateRef).endOf('day').toISOString();

    // expect(endOfDay(parseISO(dateRef))).toEqual(r);
  });

  const moveTimeZoneToUTC2 = (d) => {
    const minOffset = new Date().getTimezoneOffset();
    return formatISO(add(d, { minutes: minOffset }));
  };

  const moveTimeZoneToUTC = (d) => {
    const offsetMinutes = moment().utcOffset();

    return moment(d).add(offsetMinutes, 'm').toISOString();
  };
  test.skip('!NO isoString equivalence', () => {
    //https://github.com/date-fns/date-fns/issues/1412
    const d0 = new Date(2020, 1, 2);
    const d1 = '2020-03-24T14:34:59.147Z';

    const d1d = parseISO(d1);
    expect(moveTimeZoneToUTC(d1)).toEqual(moveTimeZoneToUTC2(d1d));
  });
});

describe('Notifications| ScheduleDateTime | change', () => {
  const dateRef = '2020-11-13T16:35:27+02:00';
  const dateHavana = '2020-11-13T14:35:00.000Z';

  const date = new Date(2020, 10, 12, 16, 35);
  const inputValue = '2020-11-13T14:35:00.000Z';

  test('moment hour/minutes() getters', () => {
    const offsetInMinutes1 = parseISO(inputValue).getTimezoneOffset();
    const currentMomentD = parseISO(inputValue);
    const currentMoment = moment(inputValue);
    expect(offsetInMinutes1).toEqual(300);
    expect(currentMoment.hour()).toEqual(9);
    expect(currentMoment.minute()).toEqual(35);
    expect(getHours(currentMomentD)).toEqual(9);
    expect(getMinutes(currentMomentD)).toEqual(35);
  });

  test('moment hour/minutes() setters', () => {
    const currentMomentD = parseISO(inputValue);
    let result = setHours(currentMomentD, 11);
    expect(getHours(result)).toEqual(11);

    let result2 = setMinutes(currentMomentD, 59);
    expect(getMinutes(result2)).toEqual(59);
  });

  test('moment.format() default value', () => {
    const d1 = moment(date);

    expect(d1.format()).toEqual('2020-11-12T16:35:00-05:00');
    expect(formatISO(date)).toEqual('2020-11-12T16:35:00-05:00');

    expect(typeof d1.format()).toEqual('string');
  });

  const handleDateChangeD = (date, value) => {
    const currentMoment = parseISO(value);
    let newMoment = parseISO2(date);

    newMoment = setHours(newMoment, getHours(currentMoment));
    newMoment = setMinutes(newMoment, getMinutes(currentMoment));

    return formatISO(newMoment);
  };

  const handleDateChange = (date, value) => {
    const currentMoment = moment(value);
    const newMoment = moment(date);

    newMoment.hour(currentMoment.hour());
    newMoment.minute(currentMoment.minute());

    return newMoment.format();
  };

  test('handleDateChange moment equivalence handleDateChangeD ', () => {
    const r1 = handleDateChange(date, inputValue);
    const r2 = handleDateChangeD(date, inputValue);

    expect(r1).toEqual(r2);
  });
});
