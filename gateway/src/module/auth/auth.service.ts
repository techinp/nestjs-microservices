import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../user/user.dto';
import { IUser } from '../user/user.interface';
import { catchError, lastValueFrom, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async createUser(data: IUser) {
    try {
      // this.authClient.emit('auth.create', data).pipe(
      //   catchError((val) => {
      //     console.log('val', val);
      //     return of({ error: val.message });
      //   }),
      // );
      // this.userClient.emit('user.create', data);
      // this.userClient.send({ cmd: 'user/create' }, { test: 2222 });
      await lastValueFrom(this.userClient.send({ cmd: 'user/create' }, data))
        .then((value) => {
          console.log('value', value);
        })
        .catch((err) => {
          console.log('err', err);
          throw err;
        });
    } catch (error) {
      console.log('error fff :', error);
      throw error;
    }
  }
}
