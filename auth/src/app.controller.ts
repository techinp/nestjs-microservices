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

  @EventPattern('auth.create')
  createUser(data: IUser) {
    try {
      return this.appService.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  // @MessagePattern({ cmd: 'auth/signIn' })
  // signInUser(): User {
  //   return this.appService.signIn();
  // }
}
