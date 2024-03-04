import {isToday,isTomorrow} from 'date-fns';
import {DailySchedule,Provider} from '../types';
import generateQuarterHourTimes from './generateQuarterHourTimes';


const getAvailableProviderTimes =  (provider: Provider, date: string) => {

  let availableTimes: string[] = []
  const newDate = new Date(date);

  if (isToday(newDate)) {
    
    return availableTimes;
  }

  const bookedAppointmentSlots: String[] = provider.bookedAppointmentSlots.reduce((acc, slot) => {
    if (slot.date === date) {
      acc.push(slot.startTime);
    }
    return acc;
  }, [] as string[]);

  const customSchedule: DailySchedule | undefined = provider.customDailySchedules.find(
    (schedule) => schedule.date === date
  );

  if (customSchedule) {
    //go through all ranges and remove booked slots
    customSchedule.availableHours.forEach((range) => {
      const availableSlots = generateQuarterHourTimes(range.start, range.end)
        .filter((slot) => !bookedAppointmentSlots.includes(slot));

        availableTimes.push(...availableSlots)
    })
  } else {
    //use default schedule
    provider.defaultDailyHours.forEach((range) => {
      const availableSlots = generateQuarterHourTimes(range.start, range.end)
        .filter((slot) => !bookedAppointmentSlots.includes(slot));

        availableTimes.push(...availableSlots)
    })

  }
 
  //if day selected is tomorrow, remove times that have already passed
  if (isTomorrow(newDate)) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSlot = `${currentHour}:${currentMinutes}`;

    availableTimes = availableTimes.filter((slot) => slot > currentSlot);
  }

  return availableTimes;
}

export default getAvailableProviderTimes;