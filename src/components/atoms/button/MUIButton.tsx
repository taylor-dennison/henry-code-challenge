import {Button,ThemeProvider,createTheme} from '@mui/material';
import React from 'react';
import colors from '../../../colors';
import './MUIButton.css';

interface MUIButtonProps {
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
const buttonTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: '#fff',
    },
  },
});

const MUIButton: React.FC<MUIButtonProps> = ({ label, variant = "contained", onClick, disabled }) => {
  return (
    <div style={{margin: '8px'}}>
      <ThemeProvider theme={buttonTheme}>
        <Button variant={variant} className='btn' onClick={onClick} disabled={disabled}>
          {label}
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default MUIButton;
