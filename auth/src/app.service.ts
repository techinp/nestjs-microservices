import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

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

  // getUsers(): User[] {
  //   return this.users;
  // }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
