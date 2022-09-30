import { CustomerModule } from './modules/customer/customer.module';
import { Module } from '@nestjs/common';
import { CustomerController } from './modules/customer/controller/CustomerController';
import { CustomerService } from './modules/customer/services/CustomerService';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    CustomerModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: 'redis://localhost:6379',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
