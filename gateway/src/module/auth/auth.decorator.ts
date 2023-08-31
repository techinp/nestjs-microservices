import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.payload;
  },
);
