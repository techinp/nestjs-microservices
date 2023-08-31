import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  GetProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async GetProduct(@Param('id') id: string): Promise<Product> {
    try {
      console.log('id :', id);
      return await this.productService.findOneById(id);
    } catch (error) {
      return error;
    }
  }

  // @Get()
  // getProfile(@GetPayload() payload: AuthPayload): AuthPayload {
  // return payload;
  // }
}
