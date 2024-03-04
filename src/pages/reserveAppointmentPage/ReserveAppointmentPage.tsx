import {DatePicker} from '@mui/x-date-pickers';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {MUIButton} from '../../components/atoms';
import getAvailableProviderTimes from '../../helpers/getAvailableProviderTimes';
import {paths} from '../../paths';
import {useAppSelector} from '../../redux/hooks';
import {createClientAppointmentSlot} from '../../redux/slices/clientsSlice';
import {showModal} from '../../redux/slices/modalSlice';

const ReserveAppointmentPage = () => {
  const { providers } = useAppSelector((state) => state.providers);
  const { currentClient } = useAppSelector((state) => state.clients);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointmentTime, setSelectedAppointmentTime] =
    useState<string>('');

  const [availableAppointmentTimes, setAvailableAppointmentTimes] = useState<
    string[]
  >([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDateSelected = (value: Date | null) => {
    if (!value) {
      return;
    }

    setSelectedDate(value);

    // get available appointment times for the selected date
    let allProviderTimes: string[] = [];
    for (const provider of providers) {
      const providerAvailability = getAvailableProviderTimes(
        provider,
        value.toLocaleDateString(),
      );

      allProviderTimes = allProviderTimes.concat(providerAvailability);
    }

    const availableTimes = Array.from(new Set(allProviderTimes)).sort();

    setAvailableAppointmentTimes(availableTimes);
  };

  const handleSave = () => {
    if (selectedDate && selectedAppointmentTime) {

    //find the provider with a matching time availability
    for (const provider of providers) {
      const providerAvailability = getAvailableProviderTimes(
        provider,
        selectedDate.toLocaleDateString(),
      );

      if (providerAvailability.includes(selectedAppointmentTime)) {
        dispatch(createClientAppointmentSlot({
          date: selectedDate.toLocaleDateString(),
          startTime: selectedAppointmentTime,
          providerId: provider.id,
          clientEmail: currentClient!.email,
        }))

        dispatch(showModal({
          title: 'Success!',
          message: 'Your appointment has been reserved',
          dismissText: 'Dismiss'
        }))

        navigate(paths.clientHome.route)
        
        return
      }

    }
  
  };
};

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <MUIButton
          variant='text'
          label='Back'
          onClick={() => navigate(paths.clientHome.route)}
        ></MUIButton>
      </div>
      <h1 style={{ marginBottom: '36px' }}>Update Specific Dates</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: 16,
        }}
      >
        <DatePicker
          label='Select a Date'
          value={selectedDate}
          onChange={(value) => handleDateSelected(value)}
        />
      </div>

      {selectedDate && availableAppointmentTimes && (
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: '0 16px' }}
        >
          <h2
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            Select an available appointment time
          </h2>
          <div>
            {availableAppointmentTimes.length > 0 ? availableAppointmentTimes.map((time, index) => {
              return (
                <MUIButton
                  key={index}
                  label={time}
                  variant={selectedAppointmentTime === time ? 'contained' : 'outlined'}

                  onClick={() => setSelectedAppointmentTime(time)}
                />
              );
            })
          : 'No available times for this date'}
          </div>

          <MUIButton
            label={'Save'}
            variant='contained'
            disabled={!selectedAppointmentTime}
            onClick={handleSave}
          />
        </div>
      )}
    </>
  );
};

export default ReserveAppointmentPage;
