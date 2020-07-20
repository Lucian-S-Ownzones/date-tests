const moment = require('moment');
moment.locale('en-gb');

const { formatDate } = require('./helper');
const getUnixTime = require('date-fns/getUnixTime');
const formatISO = require('date-fns/formatISO');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];

describe('check against moment formatting function', () => {
  test("moment.format('lll'); ===  formatDate('d MMM Y HH:mm')", () => {
    dates.map((date) => {
      const m = moment(date).format('lll');
      const d = formatDate(date, 'd MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test("moment.format('llll'); ===  formatDate('d MMM Y HH:mm')", () => {
    dates.map((date) => {
      const m = moment(date).format('llll');
      const d = formatDate(date, 'E, d MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test("moment.format('MM/DD/YYYY'')===formatDate('MM/dd/Y')", () => {
    const m = moment(dates[1]).format('MM/DD/YYYY');
    const d = formatDate(dates[1], 'MM/dd/Y');
    expect(m).toEqual(d);
  });

  test("moment.format('MM/DD/YY'')===formatDate('MM/dd/yy')", () => {
    const m = moment(dates[1]).format('MM/DD/YY');
    const d = formatDate(dates[1], 'MM/dd/yy');
    expect(m).toEqual(d);
  });

  test("moment.format('DD/MM/YYYY')===formatDate('dd/MM/Y')", () => {
    const m = moment(dates[1]).format('DD/MM/YYYY');
    const d = formatDate(dates[1], 'dd/MM/Y');
    expect(m).toEqual(d);
  });

  test('moment.format(DD/MM/YYYY hh:mm:ss) === formatDate(dd/MM/Y hh:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('DD/MM/YYYY hh:mm:ss');
      const d = formatDate(date, 'dd/MM/Y hh:mm:ss');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(YYYY-MM-DD HH:mm) === formatDate(dd/MM/Y hh:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('YYYY-MM-DD HH:mm');
      const d = formatDate(date, 'Y-MM-dd HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(M/D/YY) === formatDate(M/d/yy)', () => {
    dates.map((date) => {
      const m = moment(date).format('M/D/YY');
      const d = formatDate(date, 'M/d/yy');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(DD MM YYYY) === formatDate(dd LL Y)', () => {
    dates.map((date) => {
      const m = moment(new Date(date)).format('DD MM YYYY');
      const d = formatDate(date, 'dd LL Y');
      const d1 = formatDate(new Date(date), 'dd LL Y');
      expect(m).toEqual(d);
      expect(d1).toEqual(d);
    });
  });

  test('moment.format(YYYY-MM-DD HH:mm) === formatDate(Y-MM-dd HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('YYYY-MM-DD HH:mm');
      const d = formatDate(date, 'Y-MM-dd HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(MMMM Do YYYY h:mm:ss) === formatDate(MMMM do Y h:mm:ss)', () => {
    dates.map((date) => {
      const m = moment(date).format('MMMM Do YYYY h:mm:ss');
      const d = formatDate(date, 'MMMM do Y h:mm:ss');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(ll) === formatDate(d LLL Y)', () => {
    dates.map((date) => {
      const m = moment(date).format('ll');
      const d = formatDate(date, 'd LLL Y');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(DD MMMM YYYY, hh:mm a) === formatDate(?)', () => {
    dates.map((date) => {
      const m = moment(date).format('DD MMMM YYYY, hh:mm a');
      const d = formatDate(date, 'dd MMMM Y, hh:mm a');
      expect(m).toEqual(d.replace(' PM', ' pm'));
    });
  });

  test('moment.format(LL) === dateFormater(d LLLL Y)', () => {
    dates.map((date) => {
      const m = moment(date).format('LL');
      const d = formatDate(date, 'd LLLL Y');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(LLL) === formatDate(d MMMM Y HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('LLL');
      const d = formatDate(date, 'd MMMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('moment.format(LLLL) === formatDate(d MMMM Y HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('LLLL');
      const d = formatDate(date, 'EEEE, d MMMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('NOW: "moment().format(LLL) === formatDate(d MMMM Y HH:mm)"', () => {
    const m = moment().format('LLL');
    const d = formatDate(new Date(), 'd MMMM Y HH:mm');
    expect(m).toEqual(d);
  });

  test('moment.format(DDMMYYYY_HH:mm) === formatDate(ddMMY_HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('DDMMYYYY_HH:mm');
      const d = formatDate(date, 'ddMMY_HH:mm');
      expect(m).toEqual(d);
    });
  });
  test("moment('MMMM Do YYYY, h:mm:ss a') === formatDate('MMMM do yyyy, h:mm:ss a'')", () => {
    dates.forEach((date) => {
      const m = moment(date).format('MMMM Do YYYY, h:mm:ss a');
      const d = formatDate(date, 'MMMM do yyyy, h:mm:ss a');
      expect(m).toEqual(d.replace('PM', 'pm'));
    });
  });
});

describe('moment/timezones', () => {
  test.skip('moment().utc().toISOString() ˜= formatDate()', () => {
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
