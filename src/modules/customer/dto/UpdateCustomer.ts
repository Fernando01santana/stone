import { ApiProperty } from "@nestjs/swagger"

export default class UpdatedCustomerDto{
    @ApiProperty()
    document:Number

    @ApiProperty()
    name:String
}