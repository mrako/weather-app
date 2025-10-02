import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LastUpdatedProvider } from './contexts/LastUpdatedContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LastUpdatedProvider>
        <App />
      </LastUpdatedProvider>
    </AuthProvider>
  </React.StrictMode>,
);
