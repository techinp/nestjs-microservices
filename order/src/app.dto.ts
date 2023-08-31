import { OrderStatus } from './app.enum';
import { IUser } from './app.interface';

export class User implements IUser {
  _id: number;
  username: string;
  password: string;

  constructor(data: User) {
    this._id = data._id;
    this.username = data.username;
    this.password = data.password;
  }
}

export class Product {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;

  constructor(data: Product) {
    this._id = data._id;
    this.name = data.name;
    this.price = data.price;
    this.quantity = data.quantity;
  }
}

export class Order {
  _id: number;
  user: User;
  products: Product[];
  status: OrderStatus;
  createdAt: Date;
  summaryPrice?: number;

  constructor(data: Order) {
    this._id = data._id;
    this.user = data.user;
    this.products = data.products;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.summaryPrice = data.products.reduce((p, c) => p + c.price, 0);
  }
}
