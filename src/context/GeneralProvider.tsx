import { FC, ReactElement, useMemo, useState } from "react";
import { GeneralContext } from "./index";

const GeneralProvider: FC<{children: ReactElement}> = ({children}) => {
  const [answers, setAnswers] = useState({});

  const  setPersents = (id: number, persent: number): void => {
    setAnswers(prev => ({...prev, [id]: persent}))
  }

  const props = useMemo(() => ({
    answers, setPersents
  }), [answers]);

  return (
    <GeneralContext.Provider value={props}>
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralProvider;
