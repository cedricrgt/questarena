import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthentificationService } from './authentification.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthentificationController {
  constructor(private authentificationService: AuthentificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    description: 'Login successful, returns access token',
    type: 'object',
  })
  signIn(@Body() data: SignInDto) {
    return this.authentificationService.signIn(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    description: 'Registration successful, returns access token',
    type: 'object',
  })
  signUp(@Body() data: CreateUserDto) {
    return this.authentificationService.signUp(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    description: 'Password reset request sent to admin',
    type: 'object',
  })
  forgotPassword(@Body('email') email: string) {
    return this.authentificationService.requestPasswordReset(email);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    description: 'Returns the decoded payload of the JWT',
    type: 'object',
  })
  decodeToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    return this.authentificationService.decodeToken(token);
  }
}