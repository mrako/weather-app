import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLastUpdated } from '../../contexts/LastUpdatedContext';
import { login } from '../../helpers/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { state: { user }, dispatch } = useAuth();
  const { setLastUpdated } = useLastUpdated();

  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { user: loggedInUser, error: loginError } = await login(email, password);
      if (loginError) {
        setError(loginError);
      } else {
        dispatch({ type: 'UPDATE', payload: loggedInUser });
        setLastUpdated();
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="center full-size">
      <form onSubmit={handleSubmit}>
        <h2>Trail Weather Station</h2>
        {error ? <p className="error">{error}</p> : <p>Please log in to continue.</p>}
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
