import React, { useState, useCallback, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css'

import Router from './Router';

export const AppContext = createContext<{
  user: any;
  setUser: (user: any) => void;
  lastUpdated: Date;
  setLastUpdated: () => void;
}>({
  user: null,
  setUser: () => {},
  lastUpdated: new Date(),
  setLastUpdated: () => {},
});

const STORED_USER = import.meta.env.VITE_STORED_USER;

const App: React.FC = () => {
  const [user, setUser] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORED_USER) || 'null');
    } catch {
      return null;
    }
  });
  const [lastUpdated, setLastUpdatedState] = useState<Date>(new Date());

  const setLastUpdated = useCallback(() => {
    setLastUpdatedState(new Date());
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, lastUpdated, setLastUpdated }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
