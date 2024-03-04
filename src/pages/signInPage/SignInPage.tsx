import {TextField} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import ProviderImage from '../../assets/provider.png';
import WelcomeImage from '../../assets/welcomeImage.webp';
import {MUIButton} from '../../components/atoms';
import {isValidEmail} from '../../helpers';
import {useAppSelector} from '../../redux/hooks';
import {updateCurrentClient} from '../../redux/slices/clientsSlice';
import {updateCurrentProvider} from '../../redux/slices/providersSlice';
import {UserType} from '../../types';

interface SignInPageProps {
  type: UserType;
}

const SignInPage: React.FC<SignInPageProps> = ({ type }) => {
  const { providers } = useAppSelector((state) => state.providers);
  const { clients } = useAppSelector((state) => state.clients);


  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<{ hasError: boolean; errorText: string }>({
    hasError: false,
    errorText: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // if input is empty, set error
    if (inputValue === '') {
      setError({ hasError: true, errorText: 'Please enter a value' });
      return;
    }
    //CLIENT VALIDATIONS
    if (type === 'client') {

      const foundClient = clients.find((client) => client.email === inputValue)
      // if input is not a valid email, set error
      if (!isValidEmail(inputValue)) {

        setError({
          hasError: true,
          errorText: 'Please enter a valid email address',
        });
        return;
      }

      // if input is not a valid email, set error
      if (!foundClient) {
        setError({ hasError: true, errorText: 'Email not found' });
        return;
      }

      //Set current client in Redux
      dispatch(updateCurrentClient({currentClient: foundClient}))
  

    } else {
      //PROVIDER VALIDATIONS
      const provider = providers.find((provider) => provider.id === Number(inputValue))

      // if input is not a number for Provider ID, set error
      if (isNaN(Number(inputValue))) {
        setError({
          hasError: true,
          errorText: 'Please enter a valid provider ID',
        });
        return;
      }

      // if input is not a valid provider ID, set error
      if (!provider) {
        setError({ hasError: true, errorText: 'Provider ID not found' });
        return;
      }

      //Set current provider in Redux
      dispatch(updateCurrentProvider({provider}))
    }

    //validation has passed, navigate to home page for respective user
    navigate(type === 'client' ? '/client/home' : '/provider/home');
  };

  return (
    <>
      <h1 style={{ marginTop: '24px' }}>
        {`Please enter your ${
          type === 'provider' ? 'provider ID number' : 'email address'
        }`}
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <img
          src={type === 'client' ? WelcomeImage : ProviderImage}
          alt='Happy Customer'
          style={{ width: '50%' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          marginTop: '36px',
        }}
      >
        <TextField
          id='credential-input'
          variant='outlined'
          style={{ margin: '16px 32px' }}
          type={type === 'provider' ? 'number' : 'email'}
          label={type === 'provider' ? 'Provider ID' : 'Email'}
          helperText={error.errorText ? error.errorText : undefined}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            if (error.hasError) setError({ hasError: false, errorText: '' });
          }}
          error={error.hasError}
        ></TextField>
        <div style={{margin: '0 24px'}}>
           <MUIButton
          label='Next'
          variant='contained'
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
        />
        </div>
       
      </div>
    </>
  );
};

export default SignInPage;
