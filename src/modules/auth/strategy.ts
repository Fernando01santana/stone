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
      super({jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()});
    }
  
    // Bearer token
    async validate() {
  console.log('ENTROU NO VALIDATE');
      return 'teste';
    }
  }