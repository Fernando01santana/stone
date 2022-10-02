import { ApiProperty } from "@nestjs/swagger"

export default class  CreateCustomerDto{
    @ApiProperty({
        description: 'Numero de documento do cliente',type:Number
      })
    document:Number

    @ApiProperty({
        description: 'Nome do cliente',
      })
    name:String
}