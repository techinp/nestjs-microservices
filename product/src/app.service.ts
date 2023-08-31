import { Injectable } from '@nestjs/common';
import { Product } from './app.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly products: Product[] = [
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
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getProducts(): Product[] {
    return this.products;
  }

  findOneById(_id: number): Product {
    try {
      const product = this.products.find((item) => item._id === _id);
      if (product) return product;
      else {
        throw new RpcException({
          code: 400,
          message: 'Product not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  findById(productIds: number[]): Product[] {
    try {
      const products = this.products.filter((item) =>
        productIds.includes(item._id),
      );
      if (products.length === productIds.length) return products;
      else {
        throw new RpcException({
          code: 400,
          message: 'Product not found',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
