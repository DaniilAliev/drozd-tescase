const countRigthtAnswers = (allNum: number, answers: Array<string>) => {
  const rightAnswers = answers.filter((item) => item.includes('Correct') || item === 'Yes').length;
  const res = rightAnswers / allNum

  return Math.round(res * 10000) / 100
}

export default countRigthtAnswers;