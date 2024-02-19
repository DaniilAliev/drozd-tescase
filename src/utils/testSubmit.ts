import axios from "axios";
import countRigthtAnswers from "./countRightAnswers";
import API_ROUTES from "../routes/apiRoutes";

const submit = async (
  data: Record<string, string>,
  questionsNum: number,
  id?: string,
  setPersents?: (id: number, persents: number) => void,
  setIsAnswerSent?: (item: boolean) => void,
  jwt?: string,
) => {
  const answers = Object.values(data) as string[];
  const dataToSubmit = { answers };
  console.log(dataToSubmit);

  const persents = countRigthtAnswers(questionsNum, answers);
  setPersents && setPersents(Number(id), persents);

  console.log(persents);

  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`${API_ROUTES.URL}${API_ROUTES.QUIZ}/${id}${API_ROUTES.ANSWER}`, dataToSubmit, config);
    console.log(res);
    setIsAnswerSent && setIsAnswerSent(true);
  } catch (error) {
    console.log(error)
  }
}

export default submit;