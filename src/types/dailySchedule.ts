import {TimeRange} from '.';

type DailySchedule = {
  date: string,
  availableHours: TimeRange[],
}

export default DailySchedule
