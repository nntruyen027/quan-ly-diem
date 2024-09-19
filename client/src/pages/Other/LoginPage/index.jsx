import { Button, Paper, TextField, } from '@mui/material';
import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { adminRoutes, authRoutes, studentRoutes, teacherRoutes, } from '~/configs/routes';
import { loginRequestStart, } from '~/redux/auth/slice';

const LoginPage = () => {
  const [username, setUsername,] = React.useState('');
  const [password, setPassword,] = React.useState('');
  const { user, } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (location.pathname === authRoutes.adminLogin)
        return nav(adminRoutes.profile);
      if (location.pathname === authRoutes.teacherLogin)
        return nav(teacherRoutes.profile);
      if (location.pathname === authRoutes.login)
        return nav(studentRoutes.home);
    }
  }, [user,]); // add 'user' as a dependency

  const loginRequest = () => {
    dispatch(loginRequestStart(JSON.stringify({
      username, password,
    })));
    if (location.pathname === authRoutes.adminLogin)
      return nav(adminRoutes.profile);
    if (location.pathname === authRoutes.teacherLogin)
      return nav(teacherRoutes.profile);
    if (location.pathname === authRoutes.login)
      return nav(studentRoutes.home);
  };

  // Function to handle pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      loginRequest();
    }
  };

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-1/3 h-fit p-5 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-4'>{translate('login')}</h1>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            size='small'
            label={translate('username')}
            placeholder={translate('username')}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} 
            type='password'
            size='small'
            label={translate('password')}
            placeholder={translate('password')}
          />
          <div className='text-right'>
            <Link className='no-underline' to={authRoutes.forgotPassword}><span className='no-underline'>{translate('forgot-password')} ?</span></Link>
          </div>
          <Button variant='contained' onClick={loginRequest}>{translate('login')}</Button>
        </Paper>
      </div>
    );
  };

  return render();
};

export default LoginPage;
