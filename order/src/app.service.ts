import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, Order, Product, User } from './app.dto';
import { OrderStatus } from './app.enum';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  private readonly orders: Order[] = [
    new Order({
      _id: 1,
      user: new User({
        _id: 1,
        username: 'admin',
      }),
      products: [
        new Product({
          _id: 1,
          name: 'Snack',
          price: 100,
          quantity: 5,
        }),
        new Product({
          _id: 2,
          name: 'Table',
          price: 1900,
          quantity: 5,
        }),
        new Product({
          _id: 3,
          name: 'Chair',
          price: 1200,
          quantity: 1,
        }),
        new Product({
          _id: 4,
          name: 'Apple',
          price: 60,
          quantity: 99,
        }),
        new Product({
          _id: 5,
          name: 'TV',
          price: 9999,
          quantity: 2,
        }),
      ],
      status: OrderStatus.SUCCESS,
    }),
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getOrders(): Order[] {
    return this.orders;
  }

  async createOrder(data: CreateOrderDto) {
    try {
      const products: Product[] = await lastValueFrom(
        this.productClient.send({ cmd: 'product/findById' }, data.productIds),
      )
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw err;
        });

      console.log('products', products);

      if (products.length) {
        const order = new Order({
          user: data.user,
          products,
          _id: this.orders.length + 1,
          status: OrderStatus.PENDING,
        });
        console.log('order', order);
        this.orders.push(order);
        return order;
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  cancelOrder(_id: number) {
    try {
      const findOrder = this.findOneById(_id);
      if (findOrder) {
        this.orders[findOrder._id - 1] = {
          ...this.orders[findOrder._id - 1],
          status: OrderStatus.CANCEL,
        };
        return {
          status: 0,
          message: 'Successfully Cancelled Order',
        };
      } else {
        throw new RpcException({
          code: 400,
          message: 'Order not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  findOneById(_id: number): Order {
    try {
      const order = this.orders.find((item) => item._id === _id);
      if (order) return order;
      else {
        throw new RpcException({
          code: 400,
          message: 'Order not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
