import API_ROUTES from "../routes/apiRoutes";
import axios from "axios";
import { LoginForm } from "../types";

const submit = async (
  data: LoginForm,
  page: string,
  logIn: (data: string) => void,
  navigate: (route: string) => void,
  setError: (item: string) => void,
): Promise<void> => {
  setError('');

  if (page === 'login') {
    try {
      const res = await axios.post(`${API_ROUTES.URL}${API_ROUTES.LOGIN}`, data);
      logIn(res.data);
      navigate(API_ROUTES.MAIN);
    } catch (error) {
      setError('Такого пользователя не существует или неверный пароль');
    }
  } else {
    try {
      const res = await axios.post(`${API_ROUTES.URL}${API_ROUTES.REGISTER}`, data);
      logIn(res.data);
      navigate(API_ROUTES.MAIN);
    } catch (error) {
      setError('Ошибка регистрации');
    }
  }
}

export default submit;