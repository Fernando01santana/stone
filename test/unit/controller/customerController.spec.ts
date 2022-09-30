import { Test, TestingModule } from '@nestjs/testing'
import {mock} from 'sinon'
import { createCustomer, findById, login, updatedCustomer } from 'test/mock/mockCustomerService'
import { CustomerController } from '../../../src/modules/customer/controller/CustomerController'
import { CustomerService } from "../../../src/modules/customer/services/CustomerService"
import RedisService from '../../../src/shared/redis/RedisService'
import CallApiCustomer from '../../../src/shared/security/CallApiCustomer'

const mockCreateCustomer = {
	"name": "Rosângela Rita Heloisa Galvão",
	"document": 59377158370,
	"id": "a5839add-a90c-4e10-a697-e8fd30948aac"
}

describe('Controller tests',() =>{
    let controller: CustomerController;
    let service: CustomerService;
    beforeEach(async()=>{
        const mockCustomerService = {
            create:jest.fn().mockResolvedValueOnce([createCustomer]),
            update:jest.fn().mockResolvedValueOnce([updatedCustomer]),
            findById:jest.fn().mockResolvedValueOnce([findById]),
            login:jest.fn().mockResolvedValueOnce([login])
          };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            imports: [],
            providers: [
              {
                provide: CustomerService,
                useValue:mockCustomerService
              },
            ],
          }).compile();
          controller = module.get<CustomerController>(CustomerController);
          service = module.get<CustomerService>(CustomerService);
        });
      
        it('should be defined', () => {
          expect(controller).toBeDefined();
        });

        it('Should be return customer created', async()=>{
            const dataCustomer = {
                document:59377158370,
                name:"Rosângela Rita Heloisa Galvão"
            }

            const returnDataCustomer = {
                name: "Rosângela Rita Heloisa Galvão",
                document: 59377158370,
                id: "a5839add-a90c-4e10-a697-e8fd30948aac"
            }
            expect(service.create).toHaveBeenCalled();

            const customer = await controller.create(dataCustomer)     
            console.log("customer recebido: ",customer);
                   
            expect(customer).toEqual(returnDataCustomer)
        })
})