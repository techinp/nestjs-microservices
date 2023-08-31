import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { User } from '../user/user.dto';
import { IUser } from '../user/user.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async createUser(data: IUser) {
    try {
      this.authClient.emit('auth.create', data).pipe(
        catchError((val) => {
          console.log('val', val);
          return of({ error: val.message });
        }),
      );
      this.userClient.emit('user.create', data);
    } catch (error) {
      console.log('error :', error);
      throw { message: 'Username already exists', status: 400 };
    }
  }
}
