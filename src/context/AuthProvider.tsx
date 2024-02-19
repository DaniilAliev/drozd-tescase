import { FC, ReactElement, useMemo, useState } from "react";
import { AuthContext } from ".";
import Cookies from 'js-cookie';
import { Data } from "../types";

const AuthProvuder: FC<{ children:  ReactElement }> = ({ children }) => {
  
  const storedValue = localStorage.getItem('login');
  const currentUser = storedValue ? JSON.parse(storedValue) : null;
  const [user, setUser] = useState(currentUser || null);

  const logIn = (data: Data) => {
    const { login, jwt } = data;

    localStorage.setItem('login', JSON.stringify(login));
    setUser(login);
    Cookies.set('user_jwt', jwt, {expires: 7, secure: true});
  };

  const logOut = () => {
    localStorage.removeItem('login');
    setUser(null);
  };

  const props = useMemo(() => ({
    user, logIn, logOut, setUser,
  }), [user]);

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvuder
