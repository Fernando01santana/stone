import {mock} from 'sinon'
import { CustomerController } from '../../../src/modules/customer/controller/CustomerController'
import { CustomerService } from "../../../src/modules/customer/services/CustomerService"
import RedisService from '../../../src/shared/redis/RedisService'
import CallApiCustomer from '../../../src/shared/security/CallApiCustomer'

describe('Controller tests',() =>{

    let customerService: CustomerService
    let tokenGenerate: CallApiCustomer
    let redisService:RedisService
    let customerController:CustomerController

    beforeEach(()=>{
        tokenGenerate = new CallApiCustomer()
        redisService = new RedisService()
        customerService = new CustomerService(tokenGenerate,redisService)
        customerController = new CustomerController(customerService)
    })
    it('/ POST customers',async ()=>{
        const body = {
            document:12345678912,
            name:'Paulo Goncalves'
        }
        
        customerService.create = jest.fn(() => Promise.resolve({}))
        const result = customerController.create(body)
        expect(result).toBeDefined()
    })
})