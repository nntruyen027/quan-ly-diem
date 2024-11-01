import React from 'react';
import { authRoutes, studentRoutes, } from '~/configs/routes';
import { useDispatch, useSelector, } from 'react-redux';
import { Avatar, Box, IconButton, Menu, Tooltip, Typography, MenuItem, AppBar, Toolbar, } from '@mui/material';
import { Link, useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { logout, } from '~/redux/auth/slice';

const StudentHeader = () => {
  const [anchorElUser, setAnchorElUser,] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, } = useSelector(state => state.auth);

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
  ];

  return (
    <AppBar position='static' sx={{
      backgroundColor: '#3f51b5', 
    }}>
      <Toolbar sx={{
        justifyContent: 'space-between', 
      }}>
        {/* Menu Items */}
        <Box sx={{
          display: 'flex', gap: 3, 
        }}>
          {menuItem.map((value, index) => (
            <Link key={index} to={value.url} style={{
              textDecoration: 'none', color: '#fff', 
            }}>
              <Typography variant='body1'>{value.label}</Typography>
            </Link>
          ))}
        </Box>

        {/* User Menu */}
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
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {settings.map((setting, index) => (
              <MenuItem key={index} onClick={() => {
                setting.handle();
                handleCloseUserMenu();
              }}>
                <Typography textAlign='center' color='primary'>
                  {setting.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StudentHeader;
