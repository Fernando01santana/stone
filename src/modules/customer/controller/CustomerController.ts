import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecretValidate } from 'src/shared/decorator/auth';
import CreateCustomerDto from '../dto/CreateCustomer.dto';
import LoginDto from '../dto/LoginDto';
import UpdatedCustomerDto from '../dto/UpdateCustomer';
import ICustomer from '../interface/ICustomer';
import { CustomerService } from '../services/CustomerService';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('customers')
  @UsePipes(ValidationPipe)
  async create(@SecretValidate() validator:any , @Body() createCustomer:CreateCustomerDto): Promise<ICustomer> {    
    const token = await this.customerService.create(createCustomer)
    return token
  }

  @Put('customers/:id')
  async update(@SecretValidate() validator:any, @Param('id') id:string,@Body() updateCustomer:UpdatedCustomerDto):Promise<ICustomer>{
    const customerUpdated = await this.customerService.update(id,updateCustomer)
    return customerUpdated
  }

  @Get('customers/:id')
  async findById(@SecretValidate() validator:any, @Param('id') id:string):Promise<ICustomer>{    
    const findCustomer = await this.customerService.findById(id)
    return findCustomer
  }

  @Post('login')
  async login():Promise<ICustomer>{
    const login = await this.customerService.login()
    return login
  }
}
