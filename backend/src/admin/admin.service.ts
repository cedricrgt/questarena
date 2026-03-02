import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Create a new admin account
  async createAdmin(createAdminDto: CreateAdminDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createAdminDto.email },
          { userName: createAdminDto.userName },
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Un utilisateur avec cet email ou ce pseudo existe déjà');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = await this.prisma.user.create({
      data: {
        userName: createAdminDto.userName,
        email: createAdminDto.email,
        password_hash: hashedPassword,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${createAdminDto.userName}`,
        role: 'ADMIN',
      },
    });

    const { password_hash, ...result } = admin;
    return result;
  }

  // Get all users
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        avatar_url: true,
        role: true,
        is_blocked: true,
        created_at: true,
        _count: {
          select: {
            challenges: true,
            participations: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return users;
  }

  // Block a user
  async blockUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (user.role === 'ADMIN') {
      throw new BadRequestException('Impossible de bloquer un administrateur');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { is_blocked: true },
      select: {
        id: true,
        userName: true,
        is_blocked: true,
      },
    });
  }

  // Unblock a user
  async unblockUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { is_blocked: false },
      select: {
        id: true,
        userName: true,
        is_blocked: true,
      },
    });
  }

  // Reset user password
  async resetUserPassword(userId: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password_hash: hashedPassword },
    });

    return { message: 'Mot de passe réinitialisé avec succès' };
  }

  // Get all password reset requests
  async getPasswordResetRequests() {
    return this.prisma.passwordResetRequest.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            email: true,
            avatar_url: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Approve password reset request
  async approvePasswordResetRequest(requestId: string, newPassword: string) {
    const request = await this.prisma.passwordResetRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });

    if (!request) {
      throw new NotFoundException('Demande non trouvée');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and mark request as approved
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: request.user_id },
        data: { password_hash: hashedPassword },
      }),
      this.prisma.passwordResetRequest.update({
        where: { id: requestId },
        data: { 
          status: 'APPROVED',
          resolved_at: new Date(),
        },
      }),
    ]);

    return { message: 'Demande approuvée et mot de passe réinitialisé' };
  }

  // Reject password reset request
  async rejectPasswordResetRequest(requestId: string) {
    const request = await this.prisma.passwordResetRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Demande non trouvée');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    return this.prisma.passwordResetRequest.update({
      where: { id: requestId },
      data: { 
        status: 'REJECTED',
        resolved_at: new Date(),
      },
    });
  }

  // Get all challenges (for admin management)
  async getAllChallenges() {
    return this.prisma.challenge.findMany({
      include: {
        creator: {
          select: {
            userName: true,
          },
        },
        _count: {
          select: {
            participations: true,
            votes: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Delete a challenge
  async deleteChallenge(challengeId: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge non trouvé');
    }

    await this.prisma.challenge.delete({
      where: { id: challengeId },
    });

    return { message: 'Challenge supprimé avec succès' };
  }

  // Get all participations (for admin management)
  async getAllParticipations() {
    return this.prisma.participation.findMany({
      include: {
        user: {
          select: {
            userName: true,
          },
        },
        challenge: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Delete a participation
  async deleteParticipation(participationId: string) {
    const participation = await this.prisma.participation.findUnique({
      where: { id: participationId },
    });

    if (!participation) {
      throw new NotFoundException('Participation non trouvée');
    }

    await this.prisma.participation.delete({
      where: { id: participationId },
    });

    return { message: 'Participation supprimée avec succès' };
  }
}
