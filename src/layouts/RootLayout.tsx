import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import {useDispatch} from 'react-redux';
import {Outlet,useNavigate} from 'react-router';
import HenryLogo from '../assets/henryLogo.png';
import {paths} from '../paths';
import {useAppSelector} from '../redux/hooks';
import {hideModal} from '../redux/slices/modalSlice';

const RootLayout = () => {
   const {message, open, title } = useAppSelector((state) => state.modal);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(hideModal());
    }

  return (
    <>
      <div style={{display: 'flex', width: "100%", height: "64px", padding: '16px 0 0 16px'}}>
        <img src={HenryLogo} alt="Henry Meds Logo" style={{cursor: 'pointer'}} onClick={() => navigate(paths.welcome.route)}/>
      </div>
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      }}
    > <Outlet /></div>
    {open && (
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">
          {title}
       </DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">
            {message}
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose}>Close</Button>
       </DialogActions>
     </Dialog>)}
    </>
  )
}

export default RootLayout