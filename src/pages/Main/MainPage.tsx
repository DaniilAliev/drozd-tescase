import axios from "axios"
import API_ROUTES from "../../routes/apiRoutes"
import TestCard from "../../components/TestCard/TestCard";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../routes/ProtectedRoute";
import styles from './MainPage.module.css';
import { Test } from "../../types";

type AuthContext = {
  user: string,
  logOut: () => void,
  jwt: string,
}

const MainPage = () => {
  const [tests, setTests] = useState<Test[] | null>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const { user, logOut, jwt } = useAuthContext() as AuthContext;

  useEffect(() => {
    axios.get(`${API_ROUTES.URL}${API_ROUTES.QUIZ}`).then((res) => {
      setTests(res.data);
      setLoading(false);
    })
      .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    console.log(jwt)

    axios.get(`https://cors-anywhere.herokuapp.com/${API_ROUTES.URL}${API_ROUTES.GET_USER}`, {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => console.log(res));
  }, [jwt])

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await axios.get(`${API_ROUTES.URL}${API_ROUTES.LOGOUT}`);
      logOut();
      navigate(API_ROUTES.LOGIN);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProtectedRoute>
      <>
        <h1>{`Привет, ${user}`}</h1>
        {isLoading ? <p>Loading...</p> :
          <div className={styles.container}>
            {tests?.map((test) => <TestCard key={test.id} id={test.id} name={test.name} />)}
          </div>
        }
        <button onClick={handleClick}>Выход</button>
      </>
    </ProtectedRoute>
  )
}

export { MainPage };
