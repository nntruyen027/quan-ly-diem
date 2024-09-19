import React from 'react';
import './App.scss';
import Router from './components/router';
import { CustomSnackbar, } from './components';
import { useSnackbar, } from './helpers/utils/provider';

const App = () => {  
  const { snackbar, closeSnackbar, } = useSnackbar();

  return (
    <div className='App'>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
      <Router/>
    </div>
  );
};

export default App;