import { Product } from '../product/product.dto';
import { User } from '../user/user.dto';
import { OrderStatus } from './order.enum';

export class Order {
  _id: number;
  user: User;
  products: Product[];
  status: OrderStatus;
  createdAt?: Date;
  summaryPrice?: number;

  constructor(data: Order) {
    this._id = data._id;
    this.user = data.user;
    this.products = data.products;
    this.status = data.status;
    this.createdAt = new Date();
    this.summaryPrice = data.products.reduce((p, c) => p + c.price, 0);
  }
}
