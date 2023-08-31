import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    console.log('tte');
    return this.userService.getUsers();
  }
}
