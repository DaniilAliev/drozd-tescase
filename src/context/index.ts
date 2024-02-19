import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const GeneralContext = createContext({});
export const useGeneralContext = () => useContext(GeneralContext);