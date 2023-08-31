import { IUser } from './user.interface';

export class User implements IUser {
  _id: number;
  username: string;
  password: string;

  constructor(data: User) {
    this._id = data._id;
    this.username = data.username;
    this.password = data.password;
  }

  // signIn() {}
}
