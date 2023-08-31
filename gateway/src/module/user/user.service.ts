import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './dto/user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await lastValueFrom(
      this.userClient.send({ cmd: 'user/get' }, {}),
    );
    return users;
  }
}
