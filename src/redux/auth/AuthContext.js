// AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
  isLoggingOut: false,
  setIsLoggingOut: () => {},
});

export default AuthContext;
