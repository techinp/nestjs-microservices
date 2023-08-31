import { Injectable } from '@nestjs/common';
import { User } from './app.dto';
import { IUser } from './app.interface';

@Injectable()
export class AppService {
  private readonly users: User[] = [
    {
      _id: 0,
      username: 'admin',
      password: 'admin',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  createUser(user: IUser): User {
    try {
      const isDupUser = this.users.find(
        (item) => item.username === user.username,
      );
      if (isDupUser) throw { message: 'Username already exists', status: 400 };

      const _user: User = {
        _id: this.users.length,
        ...user,
      };
      this.users.push(_user);
      return _user;
    } catch (error) {
      throw error;
    }
  }

  // signIn(user: IUser): User {
  //   return _user;
  // }
}
