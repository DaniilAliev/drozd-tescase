import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import API_ROUTES from '../../routes/apiRoutes';
import { useAuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../types';
import submit from '../../utils/loginSubmit';

const Login = () => {
  const [page, setPage] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const { logIn, user } = useAuthContext() as {logIn: () => void, user: string};

  useEffect(() => {
    setError('')
  }, [page])

  useEffect(() => {
    if (user) {
      navigate(API_ROUTES.MAIN);
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>({
    defaultValues: {},
  });

  const handlePage = () => {
    page === 'login' ? setPage('signup') : setPage('login');
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <p className={page === 'login' ? styles.active : ''} onClick={handlePage}>Логин</p>
          <p className={page === 'signup' ? styles.active : ''} onClick={handlePage}>Регистрация</p>
        </div>

        <form onSubmit={handleSubmit((data: LoginForm) => submit(data, page, logIn, navigate, setError))}>
          <div>
            <label htmlFor="login">Логин</label>
            <input type="text" id='login' {...register('login')} />
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <input type="text" id='password' {...register('password')} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.center}>
            {
              page === 'login' ?
                <button><p>Войти</p></button> :
                <button><p>Зарегистрироваться</p></button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export { Login };
