import {useNavigate} from 'react-router';
import {MUIButton} from '../../components/atoms';
import {paths} from '../../paths';
import {useAppSelector} from '../../redux/hooks';

const ProviderHomePage = ({}) => {
  const { currentProvider } = useAppSelector((state) => state.providers);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (event.currentTarget.textContent === 'Update Default Availability') {
      navigate(paths.updateAvailability.route)
    } else {
      navigate(paths.updateSpecificDates.route)
    }
  };

  return (
    <>
      <h1 style={{ marginTop: '24px' }}>
        {`Welcome Dr. ${currentProvider?.lastName}!`}
      </h1>
      <h2>
        {currentProvider && currentProvider.bookedAppointmentSlots.length > 0
          ? `Your next meeting with a client is on ${currentProvider.bookedAppointmentSlots[0].date} at ${currentProvider.bookedAppointmentSlots[0].startTime}.`
          : 'You have no upcoming appointments scheduled.'}
      </h2>
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
          label='Update Default Availability'
          variant='contained'
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
        />
        <MUIButton
          label='Update Specific Dates'
          variant='outlined'
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
        />
      </div>
    </>
  );
};

export default ProviderHomePage;
