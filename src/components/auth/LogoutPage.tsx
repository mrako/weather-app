import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLastUpdated } from '../../contexts/LastUpdatedContext';

const LogoutPage: React.FC = () => {
  const { dispatch } = useAuth();
  const { setLastUpdated } = useLastUpdated();
  const [loggedOut, setLoggedOut] = React.useState(false);

  useEffect(() => {
    dispatch({ type: 'DELETE' });
    setLastUpdated();
    setLoggedOut(true);
  }, [dispatch, setLastUpdated]);

  if (loggedOut) {
    return <Navigate to="/login" replace />;
  }

  return null;
};

export default LogoutPage;
