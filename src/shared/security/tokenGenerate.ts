import axios from "axios";
import {config} from 'dotenv'
import CreateCustomerDto from "src/modules/customer/dto/CreateCustomer.dto";
import UpdatedCustomerDto from "src/modules/customer/dto/UpdateCustomer";
config()
export default class CallApiCustomer{
    private url = 'https://accounts.seguros.vitta.com.br'

    async getToken():Promise<any>{  
        const params = new URLSearchParams({
            grant_type:process.env.GRANT_TYPE,
            client_id:process.env.CLIENT_ID,
            client_secret:process.env.CLIENT_SECRET,
            username:process.env.USERNAME,
            password:process.env.PASSWORD,
            scope:process.env.SCOPE
        })    
        const url = 'https://accounts.seguros.vitta.com.br'
        const token = await axios.post(`${url}/auth/realms/careers/protocol/openid-connect/token`, params.toString())
          .then(function (response) {        
            return response
          })
          .catch(function (error) {
            return error
          });
          return token.data
          
    }
}
