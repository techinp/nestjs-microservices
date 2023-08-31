import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async createUser(data: User): Promise<User> {
    this.authClient.emit('user.create', data);
    this.userClient.emit('user.create', data);
    return data;
  }
}
