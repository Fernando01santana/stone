/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy';

@Module({
    imports: [PassportModule],
    controllers: [],
    providers: [LocalStrategy,PassportModule],
    exports:[LocalStrategy,PassportModule]
})
export class AuthModule {}
