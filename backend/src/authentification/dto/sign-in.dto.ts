import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ description: 'Email or username' })
    @IsString()
    @IsNotEmpty()
    email: string; // Can be email or username

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
