import { ApiProperty } from "@nestjs/swagger"

export default class ICustomer{
    @ApiProperty()
    id:String

    @ApiProperty()
    name:String
    
    @ApiProperty()
    document:String
}