const moment = require('moment');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const locale = require('date-fns/locale');
moment.locale('en-gb');

console.log(
  'change dates to fit time distance, otherwise some test might fail'
);
const d1 = '2020-02-02T14:07:14.045Z';
const d2 = '2000-02-02T14:07:14.045Z';
const d3 = '2020-07-04T14:07:14.045Z';
const d4 = '2040-02-02T14:07:14.045Z';

describe('distance express in words, not 100% the same', () => {
  test('moment.fromNow() <x> months ago', () => {
    const input = moment(d1).fromNow();
    const input2 = moment(d2).fromNow();
    const input3 = moment(d3).fromNow();
    const input4 = moment(d4).fromNow();

    expect(input).toEqual('5 months ago');
    expect(input2).toEqual('20 years ago');
    expect(input3).toEqual('2 days ago');
    expect(input4).toEqual('in 20 years');
  });

  test('formatDistanceToNow about <x> ago ', () => {
    const input = formatDistanceToNow(new Date(d1), { addSuffix: true });
    const input2 = formatDistanceToNow(new Date(d2), { addSuffix: true });
    const input3 = formatDistanceToNow(new Date(d3), { addSuffix: true });
    const input4_ru = formatDistanceToNow(new Date(d4), {
      addSuffix: true,
      locale: locale.ru,
    });
    const input4_en = formatDistanceToNow(new Date(d4), {
      addSuffix: true,
      locale: locale.enGB,
    });

    expect(input).toEqual('5 months ago');
    expect(input2).toEqual('over 20 years ago');
    expect(input3).toEqual('2 days ago');
    expect(input4_ru).toEqual('больше, чем через 19 лет');
    expect(input4_en).toEqual('in over 19 years');
  });
});
