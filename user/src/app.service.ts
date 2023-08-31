import { Injectable } from '@nestjs/common';
import { User } from './app.dto';
import { IUser } from './app.interfaec';
import { RpcException } from '@nestjs/microservices';

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

  getUsers(): User[] {
    return this.users;
  }

  createUser(user: IUser): User {
    try {
      const isDupUser = this.users.find(
        (item) => item.username === user.username,
      );
      if (isDupUser)
        throw new RpcException({
          code: 400,
          message: 'Username already exists',
        });

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
}
