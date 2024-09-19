import React from 'react';
import { adminRoutes, authRoutes, } from '~/configs/routes';
import { useDispatch, useSelector, } from 'react-redux';
import { Avatar, Box, IconButton, Menu, Tooltip, Typography, MenuItem, Paper, } from '@mui/material';
import { useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { logout, } from '~/redux/auth/slice';

const AdminHeader = () => {
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
        navigate(adminRoutes.profile);
      },
      label: translate('profile'),
    },
    {
      handle: () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate(authRoutes.adminLogin);
      },
      label: translate('logout'),
    },
  ];

  return (
    <Paper className='mx-auto w-full px-16 py-3'>
      <div>
        {/* <span className='float-left'>{'shopInfo?.name'}</span> */}
        <div className='float-right flex justify-between space-x-2'>
          <Box sx={{
            flexGrow: 0, 
          }}>
            <Tooltip title={user.fullname}>
              <IconButton onClick={handleOpenUserMenu} sx={{
                p: 0, 
              }}>
                <Avatar alt={user.fullname} src={`${process.env.REACT_APP_IMAGE_LINK}${user?.avatar}`} />
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

export default AdminHeader;