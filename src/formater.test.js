const moment = require('moment');

moment.locale('en-gb');

const { dateFormatter } = require('./helper');

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

  test('moment.format(DD MMMM YYYY) === dateFormatter(dd LL Y)', () => {
    dates.map((date) => {
      const m = moment(new Date(date)).format('DD MM YYYY');
      const d = dateFormatter(date, 'dd LL Y');
      const d1 = dateFormatter(new Date(date), 'dd LL Y');
      expect(m).toEqual(d);
      expect(d1).toEqual(d);
    });
  });

  test('moment.format(ll) === dateFormater(d LLL Y)', () => {
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

  test('moment.format(YYYY-MM-DD HH:mm) === dateFormater(Y-MM-dd HH:mm)', () => {
    dates.map((date) => {
      const m = moment(date).format('YYYY-MM-DD HH:mm');
      const d = dateFormatter(date, 'Y-MM-dd HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('check LLL', () => {
    dates.map((date) => {
      const m = moment(date).format('LLL');
      const d = dateFormatter(date, 'd MMMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });
});

describe('check equality, moment.format === dateformatter', () => {
  test("moment('YYYY') === dateFormatter('Y')", () => {
    expect(moment().format('YYYY')).toEqual(dateFormatter(new Date(), 'y'));
  });

  test("moment('MMMM Do YYYY, h:mm:ss a') === dateFormatter('MMMM do yyyy, h:mm:ss a'')", () => {
    dates.forEach((date) => {
      const m = moment(date).format('MMMM Do YYYY, h:mm:ss a');
      const d = dateFormatter(date, 'MMMM do yyyy, h:mm:ss a');
      expect(m).toEqual(d.replace('PM', 'pm'));
    });
  });
});
