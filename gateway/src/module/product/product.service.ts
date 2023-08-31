import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Product } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products: Product[] = await lastValueFrom(
      this.productClient.send({ cmd: 'product/getAll' }, {}),
    );
    return products;
  }

  async findOneById(_id: string): Promise<Product> {
    try {
      const product: Product = await lastValueFrom(
        this.productClient.send({ cmd: 'product/findOneById' }, parseInt(_id)),
      );
      return product;
    } catch (error) {
      throw error;
    }
  }
}
