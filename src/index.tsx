import '@/i18n/i18n';
import '@/providers/wdyr';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import AppProvider from '@/providers/AppProvider';
import reportWebVitals from '@/reportWebVitals';
import { ToggleProvider } from './providers/ToggleProvider';
import i18n from './i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import AuthProvider from './providers/AuthProvider';
import ErrorBoundary from './routes/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <I18nextProvider i18n={i18n}>
        <ToggleProvider>
          <AuthProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </AuthProvider>
        </ToggleProvider>
      </I18nextProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
