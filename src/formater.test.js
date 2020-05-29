const moment = require('moment');
const locale = require('date-fns/locale');

moment.locale('en-gb');

const { dateFormatter } = require('./helpers');

const dates = [
  '2020-04-02T14:07:14.045Z',
  '2020-05-14T11:12:45.625Z',
  '2020-04-30T11:03:56.341Z',
  '2020-04-29T14:47:55.379Z',
];

describe('formatting', () => {
  test('check `lll` ', () => {
    dates.map((date) => {
      const m = moment(date).format('lll');
      const d = dateFormatter(date, 'd MMM Y HH:mm');
      expect(m).toEqual(d);
    });
  });

  test('locale value ', () => {
    expect(locale.enUS.code).toEqual('en-US');
  });

  test('check `lll` undefined', () => {
    const m = moment(new Date(undefined)).format('lll');
    const d = dateFormatter(undefined, 'MMM d, Y K:mm a');
    expect(m).toEqual(d);
  });

  test('check DD/MM/YYYY', () => {
    const m = moment(dates[1]).format('DD/MM/YYYY');
    const d = dateFormatter(dates[1], 'dd/MM/Y');
    expect(m).toEqual(d);
  });

  test('check DD/MM/YYYY hh:mm:ss', () => {
    dates.map((date) => {
      const m = moment(date).format('DD/MM/YYYY hh:mm:ss');
      const d = dateFormatter(date, 'dd/MM/Y hh:mm:ss');
      expect(m).toEqual(d);
    });
  });

  test('check ll', () => {
    dates.map((date) => {
      const m = moment(date).format('ll');
      const d = dateFormatter(date, 'd LLL Y');
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
