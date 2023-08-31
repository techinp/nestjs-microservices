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
