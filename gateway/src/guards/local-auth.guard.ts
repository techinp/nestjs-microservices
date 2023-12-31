import {
  CanActivate,
  Dependencies,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthPayload } from 'src/module/auth/auth.interface';
import { AuthService } from 'src/module/auth/auth.service';
import { User } from 'src/module/user/user.dto';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type && type === 'Bearer' && token) {
      const user: User = await this.authService.validateUser(token);

      if (user) {
        const payload: AuthPayload = {
          _id: user._id,
          username: user.username,
        };
        request.payload = payload;
        return true;
      }
    }
    return false;
  }
}
