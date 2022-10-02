import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SecretValidate } from 'src/shared/decorator/auth';
import CreateCustomerDto from '../dto/CreateCustomer.dto';
import LoginDto from '../dto/LoginDto';
import UpdatedCustomerDto from '../dto/UpdateCustomer';
import ICustomer from '../interface/ICustomer';
import ILogin from '../interface/ILogin';
import { CustomerService } from '../services/CustomerService';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOkResponse({
    description: 'customers',
    type: ICustomer,
  })
  @Post('customers')
  @UsePipes(ValidationPipe)
  async create(@SecretValidate() validator:any , @Body() createCustomer:CreateCustomerDto): Promise<ICustomer> {    
    const token = await this.customerService.create(createCustomer)
    return token
  }

  @ApiOkResponse({
    description: 'customers',
    type: ICustomer,
  })
  @Put('customers/:id')
  async update(@SecretValidate() validator:any, @Param('id') id:string,@Body() updateCustomer:UpdatedCustomerDto):Promise<ICustomer>{
    const customerUpdated = await this.customerService.update(id,updateCustomer)
    return customerUpdated
  }

  @ApiOkResponse({
    description: 'customers',
    type: ICustomer,
  })
  @Get('customers/:id')
  async findById(@SecretValidate() validator:any, @Param('id') id:string):Promise<ICustomer>{    
    const findCustomer = await this.customerService.findById(id)
    return findCustomer
  }

  @ApiOkResponse({
    description: 'customers',
    type: ILogin,
  })
  @Post('login')
  async login():Promise<ILogin>{
    const login = await this.customerService.login()
    return login
  }
}
