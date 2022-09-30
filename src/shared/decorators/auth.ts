import { createParamDecorator, ExecutionContext, Next } from '@nestjs/common';
import {verify} from 'jsonwebtoken'
import AppError from '../error/AppError';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (request.headers.authorization) {
    const token = request.headers.authorization.split('Bearer ')
    verify(token.toString(), process.env.SECRET.toString(), function(err, decoded) {
     if (err) {
      console.log(err);
      
      throw new AppError('Token invalido',403)
     }
      Next();
    });
    }
    
    
    return request;
  },
);