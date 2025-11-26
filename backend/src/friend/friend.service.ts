import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async getFriends(userId: string) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { user_id: userId },
          { friend_id: userId },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            avatar_url: true,
          },
        },
        friend: {
          select: {
            id: true,
            userName: true,
            avatar_url: true,
          },
        },
      },
    });

    // Return the friend (not the current user) from each friendship
    return friendships.map((friendship) => {
      if (friendship.user_id === userId) {
        return friendship.friend;
      } else {
        return friendship.user;
      }
    });
  }

  async addFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException('Cannot add yourself as a friend');
    }

    // Check if friend exists
    const friendExists = await this.prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friendExists) {
      throw new NotFoundException('User not found');
    }

    // Check if friendship already exists
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    if (existingFriendship) {
      throw new BadRequestException('Friendship already exists');
    }

    // Create friendship
    return this.prisma.friendship.create({
      data: {
        user_id: userId,
        friend_id: friendId,
      },
      include: {
        friend: {
          select: {
            id: true,
            userName: true,
            avatar_url: true,
          },
        },
      },
    });
  }

  async removeFriend(userId: string, friendId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    await this.prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return { message: 'Friend removed successfully' };
  }

  async getFriendshipStatus(userId: string, friendId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    return { isFriend: !!friendship };
  }
}
