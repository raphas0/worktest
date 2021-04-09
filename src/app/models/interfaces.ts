export interface Response {
  results: People[];
  info: Info;
}

export interface Info {
  seed: string;
  results: string;
  page: string;
  version: string;
  time: Time;
  user: User;
}

export interface User {
  username: string;
  tier: string;
  results: string;
  remaining: string;
}

export interface Time {
  instruct: number;
  generate: number;
}

export interface People {
  userid?: string;
  name: string;
  email: string;
  picture?: string;
  gender: string;
  age: number;
  phone: string;
  documents?: string | ArrayBuffer,
}

export interface errorFormAdd{
    name: ErrorForm[],
    age: ErrorForm[],
    email: ErrorForm[],
    phone: ErrorForm[],
    gender: ErrorForm[],
    document: ErrorForm[],
}

export interface ErrorForm{
    type: string,
    message: string,
}