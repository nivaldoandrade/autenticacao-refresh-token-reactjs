import { IUser } from '@/entities/IUser';
import { httpClient } from './httpClient';

export class UsersService {

  static async getUsers() {
    const {data} = await httpClient.get<IUser[]>('/users');

    return data;
  }
}
