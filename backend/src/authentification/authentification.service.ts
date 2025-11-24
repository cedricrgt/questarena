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
  ) { }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {

    return await bcrypt.compare(password, hashedPassword);
  }

  checkEmailFormat(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Email incorrect');
    }
    return true
  }

  checkPasswordFormat(password: string) {
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

    const newUser = { ...data };
    const user = await this.usersService.create(newUser);
    const apiUser = await this.usersService.findByEmail(data.email);
    const payload = { id: apiUser?.id, name: user.userName, email: user.email, created_at: user.created_at, avatar_url: user.avatar_url, challenges: user.challenges, participations: user.participations, votes: user.votes };
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
    const payload = { id: user.id, name: user.userName, email: user.email, created_at: user.created_at, avatar_url: user.avatar_url, challenges: user.challenges, participations: user.participations, votes: user.votes };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async decodeToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // Return fresh user data, ensuring relations are included (findOne does this)
      // Exclude password_hash
      const { password_hash, ...result } = user;
      // Map userName to name to match the expected frontend interface if needed, 
      // but frontend AuthContext maps name: json.name. 
      // The previous payload had name: user.userName.
      // So we should probably return name: user.userName to be consistent with previous payload structure
      // OR update frontend to use userName.
      // Let's stick to returning the user object. 
      // Wait, the previous payload had:
      // { id, name: userName, email, ... }
      // The frontend expects:
      // name: json.name
      // The User entity has userName.
      // So if I return the entity, it has userName, not name.
      // I should map it to match what the frontend expects OR update frontend.
      // The frontend AuthContext does: name: json.name.
      // If I return { ...user, name: user.userName }, it will work.

      const response = {
        ...result,
        name: user.userName, // Map userName to name for frontend compatibility
        challengesCount: user.challenges?.length || 0,
        participationsCount: user.participations?.length || 0,
        votesCount: user.votes?.length || 0,
        role: user.role,
      };
      console.log('Debug decodeToken response:', JSON.stringify(response, null, 2));
      return response;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}