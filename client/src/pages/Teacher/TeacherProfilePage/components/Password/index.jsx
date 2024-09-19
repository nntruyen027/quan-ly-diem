import { Button, TextField, } from '@mui/material';
import React from 'react';
import { useDispatch, } from 'react-redux';
import { translate, } from '~/helpers';
import { updatePasswordRequestStart, } from '~/redux/auth/slice';
import { showSnackbar, } from '~/redux/snackbar/slice';

const Password = () => {
  const dispatch = useDispatch();

  const [oldPwd, setOldPwd,] = React.useState('');
  const [newPwd, setNewPwd,] = React.useState('');
  const [confirmNewPwd, setConfirmNewPwd,]= React.useState('');

  const handleSavePasswordInfo = () => {
    if(newPwd == confirmNewPwd)
      dispatch(updatePasswordRequestStart(JSON.stringify({
        currentPassword: oldPwd, newPassword: confirmNewPwd,
      })));
    else {
      dispatch(showSnackbar({
        message: translate('confirm unvalid!'), severity: 'error', 
      }));
    }
  };
  
  const render = () => (
    <div className='gap-3 flex flex-col'>
      <div className='rounded-xl p-3 bg-white'>
        <div className='text-left text-gray-500 font-bold mb-10'>{translate('password')}</div>
        <div>
          <div className='flex justify-between mb-4'>
            <div className='flex flex-col gap-3 w-1/2'>
              <TextField type='password' value={oldPwd} onChange={e => setOldPwd(e.target.value)} size='small' placeholder={translate('old-password')} label={translate('old-password')}/>
              <TextField type='password' value={newPwd} onChange={e => setNewPwd(e.target.value)} size='small' placeholder={translate('new-password')} label={translate('new-password')}/>
              <TextField type='password' value={confirmNewPwd} onChange={e => setConfirmNewPwd(e.target.value)} size='small' placeholder={translate('confirm-new-password')} label={translate('confirm-new-password')}/>
            </div>
          </div>
          <div className='text-left'>
            <Button onClick={handleSavePasswordInfo} variant='contained'>{translate('save')}</Button>
          </div>
        </div>
        
      </div>

    </div>
  );

  return render();
};

export default Password;