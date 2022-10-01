import { Test, TestingModule } from '@nestjs/testing'
import { createCustomer, dataLogin, findByIdMock, login, updatedCustomer } from 'test/mock/mockCustomerService'
import { CustomerController } from '../../../src/modules/customer/controller/CustomerController'
import { CustomerService } from "../../../src/modules/customer/services/CustomerService"


const mockCreateCustomer = {
	name: "Rosângela Rita Heloisa Galvão",
	document: 59377158370,
	id: "a5839add-a90c-4e10-a697-e8fd30948aac"
}
const mockCustomerService = {
  create:jest.fn().mockResolvedValueOnce([createCustomer]),
  update:jest.fn().mockResolvedValueOnce([updatedCustomer]),
  findById:jest.fn().mockResolvedValueOnce([findByIdMock]),
  login:jest.fn().mockResolvedValueOnce([login])
};
describe('Controller tests',() =>{
    let controller: CustomerController;
    let service: CustomerService;
    beforeEach(async()=>{
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

            service.create = jest
            .fn()
            .mockResolvedValueOnce(mockCreateCustomer);
    
          const result = await controller.create(
            dataCustomer
          );
    
            expect(service.create).toHaveBeenCalled();                   
            expect(result).toEqual(returnDataCustomer)
        })

        it('Should be return customer updated',async ()=>{
          const dataCustomer = {
            document:59377158370,
            name:"Gabriela Silva Matos"
        }
        const id ='a5839add-a90c-4e10-a697-e8fd30948aac'

        service.update = jest
        .fn()
        .mockResolvedValueOnce(updatedCustomer);

        const result = await controller.update(id, dataCustomer);

        expect(service.create).toHaveBeenCalled();                   
        expect(result).toEqual(updatedCustomer)
        })

        it('Should be find customer by id', async()=>{
        const id ='a5839add-a90c-4e10-a697-e8fd30948aac'

        service.findById = jest
        .fn()
        .mockResolvedValueOnce(findByIdMock);

        const result = await controller.findById(id);
        expect(service.findById).toHaveBeenCalled();                   
        expect(result).toEqual(findByIdMock)
        })

        it('Should be login',async()=>{
          service.login = jest.fn().mockResolvedValueOnce(login)
          const result = await controller.login(dataLogin)
          expect(service.login).toHaveBeenCalled()
          expect(result).toEqual(login)
        })

})