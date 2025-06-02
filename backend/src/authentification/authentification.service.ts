import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthentificationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
  
    return await bcrypt.compare(password, hashedPassword);
  }

  checkEmailFormat(email:string)
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Email incorrect');
    }
    return true
  }

  checkPasswordFormat(password:string){
    const regex = /^(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      throw new BadRequestException(
        'Mot de passe trop court ou qui ne correspond pas au format',
      );
    }
    return true
  }

  async signUp(data: CreateUserDto): Promise<any> {
    
    this.checkEmailFormat(data.email)
    this.checkPasswordFormat(data.password)

    const newUser = { ...data};
    const user = await this.usersService.create(newUser);
    const payload = {name: user.userName, email: user.email};
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(data.email);
    if (!user) {
      throw new NotFoundException();
    }
   
    const isPasswordValid = await this.comparePasswords(data.password, user.password_hash);
    if (!isPasswordValid) {
      throw new NotFoundException();
    }
    const payload = { name: user.userName, email: user.email};
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  decodeToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}