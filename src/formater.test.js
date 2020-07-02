const moment = require('moment');
moment.locale('en-gb');

const { dateFormatter } = require('./helper');
const { parseISO } = require('date-fns');
const getUnixTime = require('date-fns/getUnixTime');
const formatISO = require('date-fns/formatISO');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];

describe('check against moment formatting function', () => {
  test("moment.format('lll'); ===  dateFormatter('d MMM Y HH:mm')", () => {
    dates.map((date) => {
      const m = moment(date).format('lll');
      const d = dateFormatter(date, 'd MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test("moment.format('llll'); ===  dateFormatter('d MMM Y HH:mm')", () => {
    dates.map((date) => {
      const m = moment(date).format('llll');
      const d = dateFormatter(date, 'E, d MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test("moment.format('MM/DD/YYYY'')===dateFormatter('MM/dd/Y')", () => {
    const m = moment(dates[1]).format('MM/DD/YYYY');
    const d = dateFormatter(dates[1], 'MM/dd/Y');
    expect(m).toEqual(d);
  });

  test("moment.format('DD/MM/YYYY')===dateFormatter('dd/MM/Y')", () => {
    const m = moment(dates[1]).format('DD/MM/YYYY');
    const d = dateFormatter(dates[1], 'dd/MM/Y');
    expect(m).toEqual(d);
  });

  test('moment.format(DD/MM/YYYY hh:mm:ss) === dateFormatter(dd/MM/Y hh:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('DD/MM/YYYY hh:mm:ss');
      const d = dateFormatter(date, 'dd/MM/Y hh:mm:ss');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(YYYY-MM-DD HH:mm) === dateFormatter(dd/MM/Y hh:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('YYYY-MM-DD HH:mm');
      const d = dateFormatter(date, 'Y-MM-dd HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(M/D/YY) === dateFormatter(M/d/yy)', () => {
    dates.map((date) => {
      const m = moment(date).format('M/D/YY');
      const d = dateFormatter(date, 'M/d/yy');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(DD MM YYYY) === dateFormatter(dd LL Y)', () => {
    dates.map((date) => {
      const m = moment(new Date(date)).format('DD MM YYYY');
      const d = dateFormatter(date, 'dd LL Y');
      const d1 = dateFormatter(new Date(date), 'dd LL Y');
      expect(m).toEqual(d);
      expect(d1).toEqual(d);
    });
  });

  test('moment.format(YYYY-MM-DD HH:mm) === dateFormatter(Y-MM-dd HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('YYYY-MM-DD HH:mm');
      const d = dateFormatter(date, 'Y-MM-dd HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(MMMM Do YYYY h:mm:ss) === dateFormatter(MMMM do Y h:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('MMMM Do YYYY h:mm:ss');
      const d = dateFormatter(date, 'MMMM do Y h:mm:ss');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(ll) === dateFormatter(d LLL Y)', () => {
    dates.map((date) => {
      const m = moment(date).format('ll');
      const d = dateFormatter(date, 'd LLL Y');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(LL) === dateFormater(d LLLL Y)', () => {
    dates.map((date) => {
      const m = moment(date).format('LL');
      const d = dateFormatter(date, 'd LLLL Y');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(LLL) === dateFormatter(d MMMM Y HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('LLL');
      const d = dateFormatter(date, 'd MMMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(LLLL) === dateFormatter(d MMMM Y HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('LLLL');
      const d = dateFormatter(date, 'EEEE, d MMMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('NOW: "moment().format(LLL) === dateFormatter(d MMMM Y HH:mm)"', () => {
    const m = moment().format('LLL');
    const d = dateFormatter(new Date(), 'd MMMM Y HH:mm');
    expect(m).toEqual(d);
  });

  test('moment.format(DDMMYYYY_HH:mm) === dateFormatter(ddMMY_HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('DDMMYYYY_HH:mm');
      const d = dateFormatter(date, 'ddMMY_HH:mm');
      expect(m).toEqual(d);
    });
  });
  test("moment('MMMM Do YYYY, h:mm:ss a') === dateFormatter('MMMM do yyyy, h:mm:ss a'')", () => {
    dates.forEach((date) => {
      const m = moment(date).format('MMMM Do YYYY, h:mm:ss a');
      const d = dateFormatter(date, 'MMMM do yyyy, h:mm:ss a');
      expect(m).toEqual(d.replace('PM', 'pm'));
    });
  });
});

describe('moment/timezones', () => {
  test.skip('moment().utc().toISOString() ˜= dateFormatter()', () => {
    const m = moment().utc().toISOString();
    const d = formatISO(new Date());
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const unixTime = getUnixTime(new Date());
    expect(timezone).toEqual('Europe/Bucharest');
    expect(typeof Intl).toEqual('object');
  });
});

describe('moment constructor', () => {
  test('parsing, and formatting moment(<date>, "HH:mm").format("HH:mm") ', () => {
    const input1 = moment('133', 'HH:mm');
    const output1 = '13:03';

    expect(input1 instanceof moment).toBeTruthy();
    expect(input1.format('HH:mm')).toEqual(output1);

    const input2 = moment('99993', 'HH:mm');
    const output2 = 'Invalid date';

    expect(input2.format('HH:mm')).toEqual(output2);

    const input3 = moment('232355', 'HH:mm');
    const output3 = '23:23';
    expect(input3.format('HH:mm')).toEqual(output3);
  });
  test('moment().format("HH:mm")', () => {
    const input = moment(dates[0]).format('HH:mm');
    const output = '17:07';

    expect(input).toEqual(output);
  });
});
