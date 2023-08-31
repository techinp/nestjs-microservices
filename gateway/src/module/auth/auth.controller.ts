import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, User } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async CreateUser(@Body() user: CreateUser) {
    try {
      const users = await this.userService.getUsers();

      const isDupUser = users.find((item) => item.username === user.username);
      if (isDupUser) return { message: 'Username already exists', status: 400 };

      const _user: User = {
        _id: users.length + 1,
        ...user,
      };

      return await this.authService.createUser(_user);
    } catch (error) {
      console.log('error :', error);
      return {
        message: 'Internal Error',
        status: 500,
      };
    }
  }
}
