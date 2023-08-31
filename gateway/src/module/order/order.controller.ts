import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.dto';
import { GetPayload } from '../auth/auth.decorator';
import { AuthPayload } from '../auth/auth.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  getProducts(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Order> {
    try {
      return await this.orderService.findOneById(id);
    } catch (error) {
      return error;
    }
  }

  // ยกเลิกคำสั่งซื้อ
  // เปลี่ยน status เป็น CANCEL
  @Put(':id')
  async cancelOrder(@Param('id') id: string) {
    try {
      const response = await this.orderService.cancelOrder(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createOrder(
    @GetPayload() payload: AuthPayload,
    @Body() body: { productIds: number[] },
  ) {
    try {
      const response = await this.orderService.createOrder(
        payload,
        body.productIds,
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
