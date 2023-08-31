import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'product/getAll' })
  getUsers(): Product[] {
    return this.appService.getProducts();
  }

  @MessagePattern({ cmd: 'product/findOneById' })
  findOneByUsername(_id: number) {
    try {
      return this.appService.findOneById(_id);
    } catch (error) {
      throw error;
    }
  }
}
