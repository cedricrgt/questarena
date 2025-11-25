import { ApiProperty } from "@nestjs/swagger";
export class SignInDto {
    @ApiProperty({ description: 'Email or username' })
    email: string; // Can be email or username
    @ApiProperty()
    password: string
}
