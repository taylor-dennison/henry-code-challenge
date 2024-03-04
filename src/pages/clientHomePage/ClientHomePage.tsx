import {addMinutes,isAfter} from 'date-fns';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {MUIButton} from '../../components/atoms';
import {paths} from '../../paths';
import {useAppSelector} from '../../redux/hooks';
import {updateCurrentClient} from '../../redux/slices/clientsSlice';
import {showModal} from '../../redux/slices/modalSlice';
import {createBookedAppointmentSlot} from '../../redux/slices/providersSlice';

const ClientHomePage = ({}) => {
  const { currentClient } = useAppSelector((state) => state.clients);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate(paths.reserveAppointment.route)
  };

  const getClientAppointmentText = () => {
    if (currentClient && currentClient.confirmedAppointmentSlot) {
      if (currentClient.confirmedAppointmentSlot.isConfirmed) {
        return `You have an confirmed appointment on ${new Date(currentClient.confirmedAppointmentSlot.date).toLocaleDateString()} at ${currentClient.confirmedAppointmentSlot.startTime}.`
      } else {
        return `You have an appointment request on ${new Date(currentClient.confirmedAppointmentSlot.date).toLocaleDateString()} at ${currentClient.confirmedAppointmentSlot.startTime}. Please Confirm below!`
    
      }
    } else 
      return 'You have no upcoming appointments scheduled.'
  }

  const handleConfirm = () => {
    const datePlus30Mins = addMinutes(new Date(currentClient?.confirmedAppointmentSlot?.createdAt!), 30)

    if (isAfter(new Date(), datePlus30Mins)){
      dispatch(showModal({
        title: 'Sorry!',
        message: 'You can only confirm an appointment up to 30 minutes after it was created. Please select a new appointment',
        dismissText: 'Dismiss',
      }))
    } else {

      const {date, providerId, startTime} = currentClient?.confirmedAppointmentSlot!

      dispatch(updateCurrentClient({
        currentClient: {
          ...currentClient!,
          confirmedAppointmentSlot: {
            ...currentClient?.confirmedAppointmentSlot!,
            isConfirmed: true,
          }
        }
      }))

      dispatch(createBookedAppointmentSlot({
        providerId: providerId,
        bookedAppointmentSlot: {
          startTime: startTime,
          date: date,
        }

      }))

      dispatch(showModal({
        title: `You're all set!`,
        message: 'Your appointment has been confirmed. We look forward to seeing you soon!',
        dismissText: 'Dismiss',
      }))
    }
  }

  return (
    <>
      <h1 style={{ marginTop: '24px' }}>
        {`Welcome ${currentClient?.firstName}!`}
      </h1>
      <h2>
        {getClientAppointmentText()}
      </h2>
      {currentClient && currentClient.confirmedAppointmentSlot && !currentClient.confirmedAppointmentSlot?.isConfirmed && (
        <MUIButton
        
          label='Confirm Appointment'
          variant='contained'
          onClick={handleConfirm}
          />)}
      <h2 style={{ marginTop: '36px' }}>What would you like to do today?</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <MUIButton
          label='Reserve Appointment'
          variant='contained'
          disabled={currentClient?.confirmedAppointmentSlot?.isConfirmed === true}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
        />
      </div>
    </>
  );
};

export default ClientHomePage;
