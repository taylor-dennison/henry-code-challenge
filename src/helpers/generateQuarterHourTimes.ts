import {addMinutes,format,isBefore,parse} from 'date-fns';

const generateQuarterHourTimes = (startTime: string, endTime: string): string[] => {
  // Parse the start and end times
  let currentTime = parse(startTime, 'HH:mm', new Date());
  const finalTime = parse(endTime, 'HH:mm', new Date());

  const times: string[] = [];

  // Loop until reaching the end time
  while (isBefore(currentTime, finalTime)) {
    // Add the current time to the results
    times.push(format(currentTime, 'HH:mm'));

    // Add 15 minutes to the current time
    currentTime = addMinutes(currentTime, 15);
  }

  return times;
};

export default generateQuarterHourTimes;