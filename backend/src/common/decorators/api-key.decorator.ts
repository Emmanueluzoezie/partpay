import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const ApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }
    return apiKey;
  },
);