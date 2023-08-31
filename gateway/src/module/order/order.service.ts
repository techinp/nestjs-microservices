import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Order } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
  ) {}

  async createOrder(
    user: { _id: number; username: string },
    productIds: number[],
  ) {
    const products: Order[] = await lastValueFrom(
      this.orderClient.send({ cmd: 'order/create' }, { user, productIds }),
    );
    return products;
  }

  async cancelOrder(_id: string) {
    return await lastValueFrom(
      this.orderClient.send({ cmd: 'order/cancel' }, parseInt(_id)),
    )
      .then((res) => {
        console.log('res', res);
        return res;
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async getOrders(): Promise<Order[]> {
    const orders: Order[] = await lastValueFrom(
      this.orderClient.send({ cmd: 'order/getAll' }, {}),
    );
    return orders;
  }

  async findOneById(_id: string): Promise<Order> {
    try {
      const product: Order = await lastValueFrom(
        this.orderClient.send({ cmd: 'order/findOneById' }, parseInt(_id)),
      );
      return product;
    } catch (error) {
      throw error;
    }
  }
}
