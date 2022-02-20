export interface IUserSign {
  id: string;
  name: string;
  email: string;
  password: string;
}
export type IUserSignUp = Omit<IUserSign, 'id'>;
export type ResIUserSignUp = Omit<IUserSign, 'password'>;

//type for login
export type IUserSignIn = Pick<IUserSign, 'email' | 'password'>;

export interface ResponseAuth {
  data: JWTToken;
}
export interface JWTToken {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface SignUpResponse {
  id: string;
  name: string;
  email: string;
  error?: string;
}
