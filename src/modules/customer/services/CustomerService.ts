import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

import ReidsService from 'src/shared/redis/RedisService';
import GetToken from 'src/shared/security/CallApiCustomer';
import CreateCustomerDto from '../dto/CreateCustomer.dto';
import UpdatedCustomerDto from '../dto/UpdateCustomer';
import LoginDto from '../dto/LoginDto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly tokenGenerate:GetToken,
    private readonly redisService:ReidsService
  ){
  }
  async create(createCustomerDto:CreateCustomerDto): Promise<any> {
    const data = {
      name:createCustomerDto.name,
      document:createCustomerDto.document,
      id:String(uuidv4())
    }
    const dataCustomer = await this.redisService.createCustomer(data)
    return dataCustomer
  }

  async update(id:string,updateCustomer:UpdatedCustomerDto): Promise<any> {
    const data = {
      name:updateCustomer.name,
      document:updateCustomer.document,
      id:id
    }
    const dataCustomer = await this.redisService.updateCustomer(data)
    return dataCustomer
  }

  async findById(id:string): Promise<any> {
    const customer = await this.redisService.findById(id)
    if (!customer) {
      throw new NotFoundException('customer not found')
    }
    return customer
  }

  async login(dataLogin:LoginDto):Promise<any>{
    const token = await  this.tokenGenerate.getToken()    
    return token
  }
}
