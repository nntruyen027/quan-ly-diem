import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/inter'; // Defaults to weight 400
import '@fontsource/inter/400.css'; // Specify weight
import { LocalizationProvider, } from '@mui/x-date-pickers';
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider, } from './helpers/utils/provider';
import { FilesUiProvider, } from '@files-ui/react';
import { createTheme, ThemeProvider, } from '@mui/material';
const theme = createTheme({
  palette : {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    yellow: 'yellow',
    cyan: 'cyan',
    lime: 'lime',
    gray: 'gray',
    orange: 'orange',
    purple: 'purple',
    black: 'black',
    white: 'white',
    pink: 'pink',
    darkblue: 'darkblue',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <FilesUiProvider>
              <App />
            </FilesUiProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();