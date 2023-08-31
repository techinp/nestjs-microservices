import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async CreateUser(@Body() user: IUser) {
    try {
      await this.authService.createUser(user);
      return {
        message: 'Successfully Created',
        status: 0,
      };
    } catch (error) {
      console.log('error :', error);
      return error;
    }
  }

  @Post('signin')
  async SignInUser(@Body() user: IUser) {
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
