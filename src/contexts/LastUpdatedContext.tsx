import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

export const LastUpdatedContext = createContext<{
  lastUpdated: Date;
  setLastUpdated: () => void;
}>({
  lastUpdated: new Date(),
  setLastUpdated: () => {},
});

interface LastUpdatedProps {
  children: ReactNode;
}

export const LastUpdatedProvider: React.FC<LastUpdatedProps> = ({ children }) => {
  const [lastUpdated, setLastUpdatedState] = useState<Date>(new Date());

  const setLastUpdated = useCallback(() => {
    setLastUpdatedState(new Date());
  }, []);

  return (
    <LastUpdatedContext.Provider value={{ lastUpdated, setLastUpdated }}>
      {children}
    </LastUpdatedContext.Provider>
  );
};

export const useLastUpdated = () => useContext(LastUpdatedContext);
