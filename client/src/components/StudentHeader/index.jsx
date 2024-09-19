import React from 'react';
import { authRoutes, studentRoutes, } from '~/configs/routes';
import { useDispatch, useSelector, } from 'react-redux';
import { Avatar, Box, IconButton, Menu, Tooltip, Typography, MenuItem, Paper, } from '@mui/material';
import { Link, useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { logout, } from '~/redux/auth/slice';

const StudentHeader = () => {
  const [anchorElUser, setAnchorElUser,] = React.useState(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { user, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      handle: () => {
        navigate(studentRoutes.info);
      },
      label: translate('profile'),
    },
    {
      handle: () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate(authRoutes.login);
      },
      label: translate('logout'),
    },
  ];

  const menuItem = [
    {
      label: translate('home'),
      url: studentRoutes.home,
    },
    {
      label: translate('about-school'),
      url: studentRoutes.aboutSchool,
    },
    {
      label: translate('grade'),
      url: studentRoutes.grade,
    },
    {
      label: translate('profile'),
      url: studentRoutes.info,
    },
  ];

  return (
    <Paper className='fixed top-0 left-0 z-50 mx-auto w-full px-16 py-3'>
      <div className='flex justify-between'>
        <div className='flex space-x-3'>
          {menuItem?.map((value, index) => (<Link className='no-underline' key={index} to={value?.url}>{value?.label}</Link>))}
        </div>
        <div className='float-right flex justify-between space-x-2'>
          <Box sx={{
            flexGrow: 0, 
          }}>
            <Tooltip title={user?.fullname}>
              <IconButton onClick={handleOpenUserMenu} sx={{
                p: 0, 
              }}>
                <Avatar alt={user?.fullname} src={`${process.env.REACT_APP_IMAGE_LINK}${user?.avatar}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px', 
              }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top', horizontal: 'right', 
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top', horizontal: 'right', 
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={() => {
                  setting.handle();
                  handleCloseUserMenu();
                }}>
                  <Typography textAlign='center'>
                    <div className='no-underline text-black'>{setting?.label}</div>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>
    </Paper>
  );
};

export default StudentHeader;