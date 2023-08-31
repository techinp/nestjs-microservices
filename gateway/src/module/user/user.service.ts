import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { User } from './user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await lastValueFrom(
      this.userClient.send({ cmd: 'user/getAll' }, {}),
    );
    return users;
  }
}
