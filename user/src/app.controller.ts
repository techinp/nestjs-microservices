import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUser, User } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'user/get' })
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @EventPattern('user.create')
  getAnalytics(data: User) {
    console.log('user data :', data);

    const user = new User(data);
    return this.appService.createUser(user);
  }
}
