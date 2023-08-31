import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto, Order } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'order/create' })
  createOrder(body: CreateOrderDto) {
    console.log('body :', body);
    return this.appService.createOrder(body);
  }

  @MessagePattern({ cmd: 'order/cancel' })
  cancelOrder(_id: number) {
    try {
      return this.appService.cancelOrder(_id);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'order/getAll' })
  getOrders() {
    try {
      return this.appService.getOrders();
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'order/findOneById' })
  findOneById(_id: number) {
    try {
      return this.appService.findOneById(_id);
    } catch (error) {
      throw error;
    }
  }
}
