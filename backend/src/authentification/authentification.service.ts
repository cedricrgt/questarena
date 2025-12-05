import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthentificationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

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
    return true;
  }

  checkPasswordFormat(password: string) {
    const regex = /^(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      throw new BadRequestException(
        'Mot de passe trop court ou qui ne correspond pas au format',
      );
    }
    return true;
  }

  async signUp(data: CreateUserDto): Promise<any> {
    this.checkEmailFormat(data.email);
    this.checkPasswordFormat(data.password);

    const newUser = { ...data };
    const user = await this.usersService.create(newUser);
    const apiUser = await this.usersService.findByEmail(data.email);
    const payload = {
      id: apiUser?.id,
      name: user.userName,
      email: user.email,
      created_at: user.created_at,
      avatar_url: user.avatar_url,
      challenges: user.challenges,
      participations: user.participations,
      votes: user.votes,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmailOrUsername(data.email);
    if (!user) {
      throw new NotFoundException('Identifiants incorrects');
    }

    // Check if user is blocked
    if (user.is_blocked) {
      throw new ForbiddenException(
        'Votre compte a été bloqué. Contactez un administrateur.',
      );
    }

    if (!user.password_hash) {
      throw new NotFoundException('Identifiants incorrects');
    }
    const isPasswordValid = await this.comparePasswords(
      data.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Identifiants incorrects');
    }
    const payload = {
      id: user.id,
      name: user.userName,
      email: user.email,
      created_at: user.created_at,
      avatar_url: user.avatar_url,
      challenges: user.challenges,
      participations: user.participations,
      votes: user.votes,
    };
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

      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
        name: user.userName,
        challengesCount: user.challenges?.length || 0,
        participationsCount: user.participations?.length || 0,
        votesCount: user.votes?.length || 0,
        role: user.role,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Request password reset (creates a request for admin to approve)
  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: 'Si cet email existe, une demande a été envoyée.' };
    }

    // Check if there's already a pending request
    const existingRequest = await this.prisma.passwordResetRequest.findFirst({
      where: {
        user_id: user.id,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      return { message: 'Une demande est déjà en cours de traitement.' };
    }

    // Create the password reset request
    await this.prisma.passwordResetRequest.create({
      data: {
        user_id: user.id,
      },
    });

    return { message: 'Votre demande a été envoyée à l\'administrateur.' };
  }
}