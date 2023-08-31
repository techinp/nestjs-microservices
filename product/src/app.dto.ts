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
    this.createdAt = data.createdAt;
  }
}
