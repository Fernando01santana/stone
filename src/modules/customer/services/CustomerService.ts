import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

import ReidsService from 'src/shared/redis/RedisService';
import GetToken from 'src/shared/security/tokenGenerate';
import CreateCustomerDto from '../dto/CreateCustomer.dto';
import UpdatedCustomerDto from '../dto/UpdateCustomer';
import LoginDto from '../dto/LoginDto';
import AppError from 'src/shared/exceptions/AppError';

@Injectable()
export class CustomerService {
  constructor(
    private readonly tokenGenerate:GetToken,
    private readonly redisService:ReidsService
  ){
  }
  async create(createCustomerDto:CreateCustomerDto): Promise<any> {
    try {
      const data = {
        name:createCustomerDto.name,
        document:createCustomerDto.document,
        id:String(uuidv4())
      }
      const dataCustomer = await this.redisService.createCustomer(data)
      return dataCustomer
    } catch (error) {
      if (error.message === 'Reached the max retries per request limit (which is 20). Refer to "maxRetriesPerRequest" option for details.') {
        throw new AppError('cache indisponivel',502)
      }

      throw new AppError('request invalida',400)
    }

  }

  async update(id:string,updateCustomer:UpdatedCustomerDto): Promise<any> {
    try {
      const customerSearch = await this.findById(id)
      if (!customerSearch) {
        throw new AppError('cliente nao encontrado',404)
      }
      const data = {
        name:updateCustomer.name,
        document:updateCustomer.document,
        id:id
      }
      const dataCustomer = await this.redisService.updateCustomer(data)
      console.log(dataCustomer);
      
      return dataCustomer
    } catch (error) {
      if (error.message === 'Reached the max retries per request limit (which is 20). Refer to "maxRetriesPerRequest" option for details.') {
        throw new AppError('cache indisponivel',502)
      }

      throw new AppError('request invalida',400)
    }
  }

  async findById(id:string): Promise<any> {
    try {
      const customer = await this.redisService.findById(id)
      if (!customer) {
        throw new NotFoundException('customer not found')
      }
      return customer
    } catch (error) {
      if (error.message === 'Reached the max retries per request limit (which is 20). Refer to "maxRetriesPerRequest" option for details.') {
        throw new AppError('cache indisponivel',502)
      }

      throw new AppError('request invalida',400)
    }
  }

  async login():Promise<any>{
    try {
      const token = await  this.tokenGenerate.getToken()    
      return token
    } catch (error) {
      if (error.message === 'Reached the max retries per request limit (which is 20). Refer to "maxRetriesPerRequest" option for details.') {
        throw new AppError('cache indisponivel',502)
      }
      throw new AppError('request invalida',400)
    }
  }
}
