import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { User } from './app.dto';
import { IUser } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'auth/create' })
  async createUser(data: IUser) {
    try {
      const response = await this.appService.createUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'auth/signIn' })
  async signIn(data: IUser) {
    console.log('data :', data);
    try {
      const response = await this.appService.signIn(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
