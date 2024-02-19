export type Test = {
  id: number,
  name: string,
};

export type LoginForm = {
  login: string,
  password: string,
};

export interface Quiz {
  name: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answers: string[];
}

export type AuthContext = {
  user: string,
  logOut: () => void,
  jwt: string,
}


export interface Data {
  login: string;
  jwt: string;
}