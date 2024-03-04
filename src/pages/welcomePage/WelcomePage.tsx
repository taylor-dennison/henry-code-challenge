import {useNavigate} from 'react-router';
import WelcomeImage from '../../assets/welcomeImage.webp';
import {MUIButton} from '../../components/atoms';
import {paths} from '../../paths';

const WelcomePage = () => {

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`${paths.signIn.route}/${event.currentTarget.textContent?.toLowerCase()}`)
  }

  return (
    <>
      <h1 style={{ marginTop: '24px' }}>
        Welcome to Henry Meds Online Reservation System!
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img src={WelcomeImage} alt='Happy Customer' style={{ width: '50%' }} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ margin: '36px 16px 0 16px' }}>
          Are you a Henry Meds Provider or a client?
        </h2>

        <div style={{padding: '0 16px'}}>
          <MUIButton label='Provider' variant='contained' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}/>
          <MUIButton label='Client' variant='outlined' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}/>

        </div>
      </div>
    </>
  );
};

export default WelcomePage;
