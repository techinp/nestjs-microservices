import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './user.dto';
import { lastValueFrom } from 'rxjs';
import { Order } from '../order/order.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await lastValueFrom(
      this.userClient.send({ cmd: 'user/getAll' }, {}),
    );
    return users;
  }

  async getOrderHistory(_id: number): Promise<Order[]> {
    const orders: Order[] = await lastValueFrom(
      this.orderClient.send({ cmd: 'order/findByUserId' }, _id),
    );
    return orders;
  }
}
