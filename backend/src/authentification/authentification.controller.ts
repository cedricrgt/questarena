import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthentificationService } from "./authentification.service";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthentificationController {
  constructor(private authentificationService: AuthentificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    type: SignInDto
  })
  @ApiResponse({
    description: 'Login successful, returns access token',
    type: 'object'
  })
  signIn(@Body() data: SignInDto ) {
    return this.authentificationService.signIn(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    description: 'Registration successful, returns access token',
    type: 'object'
  })
  signUp(@Body() data: CreateUserDto ) {
    return this.authentificationService.signUp(data);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    description: 'Returns the decoded payload of the JWT',
    type: 'object'
  })
  decodeToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    return this.authentificationService.decodeToken(token);
  }

}