import { ApiProperty } from "@nestjs/swagger"

export default class ILogin{
    @ApiProperty()
    access_token:String

    @ApiProperty()
    expires_in:Number

    @ApiProperty()
    refresh_expires_in:Number

    @ApiProperty()
    token_type:String

    @ApiProperty()
    id_token:String

    @ApiProperty()
    "not-before-policy":Number

    @ApiProperty()
    scope:String
}