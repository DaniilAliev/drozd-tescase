import styles from './TestCard.module.css';
import { Test } from '../../types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGeneralContext } from '../../context';

const TestCard: FC<Test> = ({ id, name }) => {

  const { answers } = useGeneralContext() as { answers: string[] };

  console.log(answers)

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h2>{name}</h2>
        {!answers[id] ? 'Вы ещё не проходили этот тест' : `Ваш предыдущий результат: ${answers[id]}%`}
        <Link to={`/${id}`}>
          <button className={styles.button}><p>Начать</p></button>
        </Link>
      </div>
    </div >
  )
}

export default TestCard
