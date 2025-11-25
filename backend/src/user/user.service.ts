import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          userName: createUserDto.userName,
          email: createUserDto.email,
          password_hash: hashedPassword,
          avatar_url: 'https://placehold.co/10',
        },
      });

      const { password_hash, ...result } = user;
      return result as UserEntity;
    }
    catch (error) {
      throw new BadRequestException('Invalid Data');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      const { password_hash, ...result } = user;
      return result as UserEntity;
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        challenges: true,
        participations: true,
        votes: true,
      },
    });
    console.log(`Debug UserService.findOne(${id}):`, JSON.stringify(user, null, 2));

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password_hash, ...result } = user;
    return result as unknown as UserEntity;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      await this.findOne(id);

      const data: any = {};

      if (updateUserDto.userName) {
        data.userName = updateUserDto.userName;
      }

      if (updateUserDto.email) {
        data.email = updateUserDto.email;
      }

      if (updateUserDto.password) {
        data.password_hash = await bcrypt.hash(updateUserDto.password, 10);
      }

      if (updateUserDto.avatar_url) {
        data.avatar_url = updateUserDto.avatar_url;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      const { password_hash, ...result } = updatedUser;
      return result as UserEntity;
    }
    catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async delete(id: string): Promise<UserEntity> {
    await this.findOne(id);

    const user = await this.prisma.user.delete({
      where: { id },
    });

    const { password_hash, ...result } = user;
    return result as UserEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const { password_hash, ...result } = user;
    return result as UserEntity;
  }
  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByEmailOrUsername(identifier: string): Promise<UserEntity | null> {
    // Try to find by email first
    let user = await this.prisma.user.findUnique({ where: { email: identifier } });

    // If not found by email, try username
    if (!user) {
      user = await this.prisma.user.findUnique({ where: { userName: identifier } });
    }

    return user;
  }

  async getLeaderboard(limit = 10) {
    const weights = {
      participation: 10,
      vote: 2,
      challengeCreated: 5,
    };

    // Retrieve users with their participations, votes given, and challenges created
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        participations: { select: { id: true } }, // Count all participations
        votes: { select: { id: true } }, // Count votes given
        challenges: { select: { id: true } },
      },
    });

    const leaderboardData = users.map((user) => {
      const participationsCount = user.participations.length;
      const votesGivenCount = user.votes.length;
      const challengesCreatedCount = user.challenges.length;

      const score =
        participationsCount * weights.participation +
        votesGivenCount * weights.vote +
        challengesCreatedCount * weights.challengeCreated;

      return {
        id: user.id,
        score,
      };
    });

    // Sort users by score
    const topUsers = leaderboardData
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Apply Rank Bonuses (1st: +10, 2nd: +5, 3rd: +2)
    // Note: This modifies the score for display/ranking purposes.
    // If the bonus affects the ranking itself, we would need to re-sort, 
    // but typically rank bonuses are rewards for *being* in that rank.
    // However, the user said "if his ranking changes then the number of points must be modified",
    // implying the bonus is dynamic based on current rank.
    const rankedUsers = topUsers.map((user, index) => {
      let bonus = 0;
      if (index === 0) bonus = 10;
      else if (index === 1) bonus = 5;
      else if (index === 2) bonus = 2;

      return {
        ...user,
        score: user.score + bonus,
      };
    });

    // Fetch username and avatar for the top users
    const userDetails = await this.prisma.user.findMany({
      where: { id: { in: rankedUsers.map((u) => u.id) } },
      select: { id: true, userName: true, avatar_url: true },
    });

    // Combine score with user details for the leaderboard
    const leaderboard = rankedUsers.map((u) => ({
      ...userDetails.find((d) => d.id === u.id),
      score: u.score,
    }));

    return leaderboard;
  }

  async searchUsers(query: string): Promise<UserEntity[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const users = await this.prisma.user.findMany({
      where: {
        userName: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        userName: true,
        avatar_url: true,
        created_at: true,
      },
      take: 10,
    });

    return users as unknown as UserEntity[];
  }
}
