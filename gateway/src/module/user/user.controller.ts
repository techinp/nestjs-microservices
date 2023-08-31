import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.dto';
import { Request } from 'express';
import { AuthPayload } from '../auth/auth.interface';
import { GetPayload } from '../auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(@Req() req: any): Promise<User[]> {
    console.log('req :', req.payload);
    return this.userService.getUsers();
  }

  @Get()
  getProfile(@GetPayload() payload: AuthPayload): AuthPayload {
    return payload;
  }
}
