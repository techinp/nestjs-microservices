import { Inject, Injectable } from '@nestjs/common';
import { User } from './app.dto';
import { IUser } from './app.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(data: IUser): Promise<User> {
    try {
      return await lastValueFrom(
        this.userClient.send({ cmd: 'user/create' }, data),
      )
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async signIn(data: IUser) {
    try {
      return await lastValueFrom(
        this.userClient.send({ cmd: 'user/findOneByUsername' }, data.username),
      )
        .then((value: User) => {
          if (value.password === data.password) return value;
          else
            throw {
              code: 400,
              message: 'Password mismatch',
            };
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
