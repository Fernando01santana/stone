import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
type Payload = {
    id: string;
  };
  
  @Injectable()
  export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
      super({jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: ''});
    }
  
    // Bearer token
    async validate(payload) {
  console.log('ENTROU NO VALIDATE',payload);

      const token = payload;
      return token;
    }
  }