import Redis from 'ioredis'

import CreateCustomerDto from 'src/modules/customer/dto/CreateCustomer.dto';
import UpdatedCustomerDto from 'src/modules/customer/dto/UpdateCustomer';
import { ICreateCustomer } from 'src/modules/customer/interface/ICreateCustomer';
import { IUpdatedCustomer } from 'src/modules/customer/interface/IUpdateCustomer';

export default class RedisService{
    private redis = new Redis
    async createCustomer(createCustomer:ICreateCustomer):Promise<any>{        
      
        this.redis.set(`customer:${createCustomer.id}`,JSON.stringify(createCustomer))
        return this.redis.get(`customer:${createCustomer.id}`)
    }
    async updateCustomer(updatedCustomer:IUpdatedCustomer):Promise<any>{        
        const customer = await this.redis.get(`customer:${updatedCustomer.id}`)
        
        if(!customer){
            throw new Error('Customer not found')
        }
        await this.redis.set(`customer:${updatedCustomer.id}`,JSON.stringify(updatedCustomer))
        const customerUpdated = this.redis.get(`customer:${updatedCustomer.id}`)
        
        return customerUpdated
    }
    async findById(id:string):Promise<any>{
        return this.redis.get(`customer:${id}`)
    }
}