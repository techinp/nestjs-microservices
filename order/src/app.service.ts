import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Order, User } from './app.dto';

@Injectable()
export class AppService {
  private readonly order: Order[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  // getUsers(): User[] {
  //   return this.users;
  // }
}
