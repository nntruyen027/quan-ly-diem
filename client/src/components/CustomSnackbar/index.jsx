import React from 'react';
import { Snackbar, Alert, } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, } from 'react-redux';
import { hideSnackbar, } from '~/redux/snackbar/slice';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbar.severity} sx={{
        width: '100%', 
      }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomSnackbar;