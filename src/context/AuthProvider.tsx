import { FC, ReactElement, useMemo, useState } from "react";
import { AuthContext } from ".";

const AuthProvuder: FC<{ children:  ReactElement }> = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('login'));
  const token = JSON.parse(localStorage.getItem('jwt'))

  const [user, setUser] = useState(currentUser || null);
  const [jwt, setJwt] = useState(token || null);

  const logIn = (data) => {
    const { login, jwt } = data;

    localStorage.setItem('login', JSON.stringify(login));
    localStorage.setItem('jwt', JSON.stringify(jwt));
    setUser(login);
    setJwt(jwt);
    console.log(login, jwt)
  };

  const logOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('login');
    localStorage.removeItem('jwt');
    setUser(null);
  };

  const props = useMemo(() => ({
    user, logIn, logOut, setUser, jwt,
  }), [user, jwt]);

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvuder
