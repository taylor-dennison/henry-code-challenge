import {Provider} from '../types';

const initialProvidersData: Provider[] = [
  {
    id: 1,
    firstName: 'Rick',
    lastName: 'Sanchez',
    defaultDailyHours: [
      {
        start: '09:00',
        end: '23:00',
      },
    ],
    customDailySchedules: [],
    bookedAppointmentSlots: [],
  },
  {
    id: 1,
    firstName: 'Morty',
    lastName: 'Smith',
    defaultDailyHours: [
      {
        start: '09:00',
        end: '17:00',
      },
    ],
    customDailySchedules: [],
    bookedAppointmentSlots: [],
  },
];

export default initialProvidersData;