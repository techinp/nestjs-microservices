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
    return this.appService.getUsers();
  }

  @MessagePattern({ cmd: 'user/create' })
  createUser(data: IUser) {
    try {
      return this.appService.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'user/findOneByUsername' })
  findOneByUsername(username: string) {
    try {
      return this.appService.findOneByUsername(username);
    } catch (error) {
      throw error;
    }
  }
}
