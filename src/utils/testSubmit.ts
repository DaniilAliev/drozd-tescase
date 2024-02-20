import axios from "axios";
import countRigthtAnswers from "./countRightAnswers";
import API_ROUTES from "../routes/apiRoutes";
// import Cookies from "js-cookie";

const submit = async (
  data: Record<string, string>,
  questionsNum: number,
  id?: string,
  setPersents?: (id: number, persents: number) => void,
  setIsAnswerSent?: (item: boolean) => void,
) => {

  // const token = Cookies.get('user_jwt');

  const answers = Object.values(data) as Array<string>;

  const dataToSubmit = { answers };

  const persents = countRigthtAnswers(questionsNum, answers);
  setPersents && setPersents(Number(id), persents);

  // const config = {
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }
  // }

  try {
      await axios.post(`${API_ROUTES.URL}${API_ROUTES.QUIZ}/${id}${API_ROUTES.ANSWER}`,
      dataToSubmit,
      // config
    );
    setIsAnswerSent && setIsAnswerSent(true);
  } catch (error) {
    console.log(error)
  }
}

export default submit;