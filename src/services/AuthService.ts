import { httpClient } from './httpClient';


interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService{

  static async signIn({email, password}: ISignInDTO) {
    const {data} = await httpClient.post<ISignInResponse>('/auth/login', {
      email,
      password
    });

    return data;
  }
}
