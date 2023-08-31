import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from '../user/user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async createUser(data: IUser) {
    try {
      await lastValueFrom(this.authClient.send({ cmd: 'auth/create' }, data))
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async signIn(data: IUser) {
    try {
      return await lastValueFrom(
        this.authClient.send({ cmd: 'auth/signIn' }, data),
      )
        .then((value) => {
          // Encode JWT Here
          return value;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string) {
    try {
      return await lastValueFrom(
        this.userClient.send({ cmd: 'user/findOneByUsername' }, username),
      )
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
}
