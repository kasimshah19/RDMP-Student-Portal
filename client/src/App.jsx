import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { HelmetProvider } from 'react-helmet-async';

const GlobalErrorListener = () => {
  const { addToast } = useToast();
  useEffect(() => {
    const handler = (e) => addToast(e.detail, 'error');
    const handleOffline = () => addToast('You are currently offline. Displaying cached shell.', 'error');
    window.addEventListener('global_api_error', handler);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('global_api_error', handler);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);
  return null;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <GlobalErrorListener />
        <HelmetProvider>
          <Router>
            <AppRoutes />
          </Router>
        </HelmetProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
