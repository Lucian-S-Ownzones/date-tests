const moment = require('moment');
moment.locale('en-gb');
const locale = require('date-fns/locale');
const { formatGuard } = require('./helpers');

const dates = ['2020-05-14T13:12:45.625Z', '2020-05-14T11:12:45.625Z'];

describe('formatting', () => {
  test('check `lll` 1', () => {
    const m = moment(dates[0]).format('lll');
    const d = formatGuard(new Date(dates[0]), 'd MMM Y HH:mm');
    expect(m).toEqual(d);
  });

  test('locale value ', () => {
    expect(locale.enUS.code).toEqual('en-US');
  });

  test('check `lll` undefined', () => {
    const m = moment(new Date(undefined)).format('lll');
    const d = formatGuard(new Date(undefined), 'MMM d, Y K:mm a');
    expect(m).toEqual(d);
  });

  test('check DD/MM/YYYY', () => {
    const m = moment(dates[1]).format('DD/MM/YYYY');
    const d = formatGuard(new Date(dates[1]), 'dd/MM/Y');
    expect(m).toEqual(d);
  });

  test('check DD/MM/YYYY hh:mm:ss', () => {
    const m = moment(dates[1]).format('DD/MM/YYYY hh:mm:ss');
    const d = formatGuard(new Date(dates[1]), 'dd/MM/Y hh:mm:ss');
    expect(m).toEqual(d);
  });

  test('check ll', () => {
    const m = moment(dates[1]).format('ll');
    const d = formatGuard(new Date(dates[1]), 'dd LLL Y');
    expect(m).toEqual(d);
  });
});
