import { FC, ReactElement, useEffect } from 'react'
import { useAuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import API_ROUTES from './apiRoutes';

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const { user, logOut } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(API_ROUTES.LOGIN)
    }
  }, [navigate, user])

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;
