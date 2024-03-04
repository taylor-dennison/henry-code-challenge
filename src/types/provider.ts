import {DailySchedule,ProviderAppointmentSlot,TimeRange} from '.'

type Provider = {
  id: number,
  firstName: string,
  lastName: string,
  defaultDailyHours: TimeRange[],
  customDailySchedules: DailySchedule[],
  bookedAppointmentSlots: ProviderAppointmentSlot[],
}

export default Provider