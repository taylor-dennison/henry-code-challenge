import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider} from 'react-redux';
import App from './App.tsx';
import './index.css';
import {ErrorPage} from './pages/index.ts';
import {store} from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <App />
        </ErrorBoundary>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
);
