import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext, useGeneralContext } from "../../context";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../routes/ProtectedRoute";
import API_ROUTES from "../../routes/apiRoutes";
import submit from "../../utils/testSubmit";
import styles from './Test.module.css';

const Test = () => {
  const [quiz, setQuiz] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAnswerSent, setIsAnswerSent] = useState<boolean>(false);

  const { id } = useParams();

  const { jwt } = useAuthContext() as { jwt: string};

  const { setPersents } = useGeneralContext() as { setPersents: (id: number, persent: number) => void };

  const { register, handleSubmit } = useForm();

  const questionsNum = quiz?.questions.length;

  useEffect(() => {
    axios.get(`${API_ROUTES.URL}${API_ROUTES.QUIZ}/${id}`)
      .then((res) => {
        console.log(res);
        setQuiz(res.data);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [id]);

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        {isLoading ? <p>Loading...</p> :
          <>
            <h1>{quiz.name}</h1>
            <form onSubmit={handleSubmit((data) => submit(data, questionsNum, id, setPersents, setIsAnswerSent, jwt))}>
              {quiz.questions.map((item) => (
                <div className={styles.quiz} key={item.question}>
                  <h2>{item.question}</h2>
                  {item.answers.map((answer) => (
                    <div key={answer}>
                      <label>
                        <input
                          className={styles.radio}
                          type="radio"
                          value={answer}
                          {...register(`${item.question}`)} />
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              <button
                className={styles.button}
                type="submit"
                disabled={isAnswerSent}
              ><p>Отправить ответы</p></button>

              {isAnswerSent &&
                <div className={styles.completed}>
                  <p>Ваши ответы отправлены!</p>
                  <Link to={API_ROUTES.MAIN}><p>На главную</p></Link>
                </div>
              }
            </form>
          </>
        }
      </div>
    </ProtectedRoute>
  )
}

export { Test };
