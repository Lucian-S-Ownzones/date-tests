const {
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
  intervalToDuration,
  parseISO,
} = require('date-fns');
const moment = require('moment');

const getDuration = (start, end) => {
  const { hours, minutes, seconds } = intervalToDuration({
    start: parseISO(start),
    end: parseISO(end),
  });

  return { hours, minutes, seconds };
};

const getDateDiff = (start, end) => {
  return {
    hours: differenceInHours(parseISO(end), parseISO(start)),
    minutes: differenceInMinutes(parseISO(end), parseISO(start)),
    seconds: differenceInSeconds(parseISO(end), parseISO(start)),
  };
};

describe('test duration differences', () => {
  const start = '2020-09-01T01:00:00.000Z';
  const end = '2020-09-09T02:00:00.000Z';
  test('intervalToDuration values', () => {
    const { hours, minutes, seconds } = getDuration(start, end);
    const timeStr = `${hours}h${minutes}m${seconds}s`;
    expect(timeStr).toEqual('1h0m0s');
  });

  test('differenceIn* values', () => {
    const { hours, minutes, seconds } = getDateDiff(start, end);
    const hoursD = parseInt(hours);
    const minutesD = parseInt(minutes) % 60;
    const secondsD = parseInt(seconds) % 60;
    const timeStr = `${hoursD}h${minutesD}m${secondsD}s`;
    expect(timeStr).toEqual('193h0m0s');
  });

  test('difference using moment', () => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    const hoursM = parseInt(duration.asHours(), 10);
    const minutesM = parseInt(duration.asMinutes(), 10) % 60;
    const secondsM = parseInt(duration.asSeconds(), 10) % 60;

    const timeStr = `${hoursM}h${minutesM}m${secondsM}s`;
    expect(timeStr).toEqual('193h0m0s');
  });
});
