import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/modules/auth/LocalAuth.guard';
import CreateCustomerDto from '../dto/CreateCustomer.dto';
import LoginDto from '../dto/LoginDto';
import UpdatedCustomerDto from '../dto/UpdateCustomer';
import ICustomer from '../interface/ICustomer';
import { CustomerService } from '../services/CustomerService';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('customers')
  async create(@Body() createCustomer:CreateCustomerDto): Promise<ICustomer> {
    const token = await this.customerService.create(createCustomer)
    return token
  }

  @Put('customers/:id')
  async update(@Param('id') id:string,@Body() updateCustomer:UpdatedCustomerDto):Promise<ICustomer>{
    const customerUpdated = await this.customerService.update(id,updateCustomer)
    return customerUpdated
  }
  @UseGuards(LocalAuthGuard)
  @Get('customers/:id')
  async findById(@Param('id') id:string):Promise<ICustomer>{
    const findCustomer = await this.customerService.findById(id)
    return findCustomer
  }

  @Post('login')
  async login(@Body() dataLogin:LoginDto):Promise<any>{
    const login = await this.customerService.login(dataLogin)
    return login
  }
}