import { Button, Paper, TextField, } from '@mui/material';
import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { OTPInput, } from '~/components';
import { authRoutes, } from '~/configs/routes';
import { translate, } from '~/helpers';
import { resetPasswordRequestStart, } from '~/redux/auth/slice';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword,] = React.useState('');
  const [token, setToken,] = React.useState('');

  const dispatch = useDispatch();
  const { resetPasswordSuccess, } = useSelector(state => state.auth);
  const nav = useNavigate();

  const handleRequest = () => {
    dispatch(resetPasswordRequestStart(JSON.stringify({
      token,
      newPassword,
    })));
  };

  useEffect(()=> {
    if(resetPasswordSuccess === true) {
      nav(authRoutes.adminLogin);
    }

  }, [dispatch, resetPasswordSuccess,]);

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-fit h-fit p-5 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-4'>{translate('reset-password')}</h1>
          <TextField value={newPassword} onChange={(e) => setNewPassword(e.target.value)} size='small' label={translate('password')} placeholder={translate('password')}/>
          <div className='flex justify-center'>
            <OTPInput value={token} setValue={setToken}/>
          </div>
          <Button variant='contained' onClick={handleRequest} >{translate('send-code')}</Button>
        </Paper>
      </div>
    );
  };

  return render();
};

export default ResetPasswordPage;