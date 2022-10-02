import { createParamDecorator, ExecutionContext, Next, UnauthorizedException } from '@nestjs/common';

export const SecretValidate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split('Bearer ')[1]
    if (!token) {
        throw new UnauthorizedException('Acesso negado')
    }    
    Next()
    return 
  },
);