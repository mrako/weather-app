import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';

const STORED_USER = import.meta.env.VITE_STORED_USER;

interface AuthState {
  user: any;
  loading: boolean;
}

interface AuthAction {
  type: 'UPDATE' | 'DELETE' | 'STOP_LOADING';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'UPDATE':
      if (action.payload) {
        localStorage.setItem(STORED_USER, JSON.stringify(action.payload));
      }
      return { ...state, user: action.payload || null, loading: false };
    case 'DELETE':
      localStorage.removeItem(STORED_USER);
      return { ...state, user: null, loading: false };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const sendUserToNative = (user: any) => {
  try {
    if (window.webkit?.messageHandlers?.sendPushToken) {
      console.log("Sending user token to native app");
      window.webkit.messageHandlers.sendPushToken.postMessage(user.token);
    }
  } catch (error) {
    console.error("Error sending token to native app:", error);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, loading } = state;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORED_USER) || 'null');
    if (storedUser) {
      dispatch({ type: 'UPDATE', payload: storedUser });
    } else {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, []);

  useEffect(() => {
    if (!loading && user) {
      sendUserToNative(user);
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
