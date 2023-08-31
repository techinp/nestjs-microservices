import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { User } from './app.dto';
import { IUser } from './app.interfaec';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'user/getAll' })
  getUsers(data: any): User[] {
    console.log('data getUsers:', data);
    return this.appService.getUsers();
  }

  // @EventPattern('user.create')
  @MessagePattern({ cmd: 'user/create' })
  createUser(data: IUser) {
    console.log('data :', data);
    try {
      return this.appService.createUser(data);
    } catch (error) {
      console.log('error ser/crea :', error);
      throw error;
    }
  }
}
