import { Button, Paper, TextField, } from '@mui/material';
import React from 'react';
import { useDispatch, } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import { authRoutes, } from '~/configs/routes';
import { translate, } from '~/helpers';
import { forgotPasswordRequestStart, } from '~/redux/auth/slice';

const ForgetPasswordPage = () => {
  const [email, setemail,] = React.useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleRequest = () => {
    dispatch(forgotPasswordRequestStart(JSON.stringify({
      email,
    })));
    nav(authRoutes.resetPassword);
  };

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-1/3 h-fit p-5 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-4'>{translate('forget-password')}</h1>
          <TextField value={email} onChange={(e) => setemail(e.target.value)} size='small' label={translate('email')} placeholder={translate('email')}/>
          <div className='text-right'>
            <span>{translate('have-account')}? </span><Link to={authRoutes.adminLogin}>{translate('login')}</Link>
          </div>
          <Button variant='contained' onClick={handleRequest} >{translate('send-code')}</Button>
        </Paper>
      </div>
    );
  };

  return render();
};

export default ForgetPasswordPage;