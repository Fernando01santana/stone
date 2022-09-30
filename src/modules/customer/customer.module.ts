/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import ReidsService from 'src/shared/redis/RedisService';
import CallApiCustomer from 'src/shared/security/CallApiCustomer';
import { CustomerController } from './controller/CustomerController';
import { CustomerService } from './services/CustomerService';

@Module({
    imports: [CallApiCustomer],
    controllers: [CustomerController],
    providers: [CustomerService,CallApiCustomer,ReidsService],
    exports:[CustomerService]
})
export class CustomerModule {}
