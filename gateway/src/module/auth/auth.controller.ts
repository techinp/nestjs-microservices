import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
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
      return error;
    }
  }

  @Post('signin')
  async SignInUser(@Body() data: IUser) {
    console.log('data :', data);
    try {
      const response = await this.authService.signIn(data);
      console.log('response :', response);

      return response;
    } catch (error) {
      return error;
    }
  }
}
