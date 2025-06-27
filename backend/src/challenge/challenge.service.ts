import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  create(createChallengeDto: CreateChallengeDto) {
    const { user_id, image_url, ...rest } = createChallengeDto;
    const finalImageUrl =
      image_url?.trim() ||
      `https://via.assets.so/game.webp?id=${Math.floor(Math.random() * 50) + 1}`;
    return this.prisma.challenge.create({
      data: {
        ...rest,
        image_url: finalImageUrl,
        creator: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  async findAll() {
    const res = await this.prisma.challenge.findMany({
      include: {
        votes: true,
        participations: true,
      },
    });
   
  return res.map(challenge => ({
    ...challenge,
    createdAt: challenge.created_at?.toISOString(),
  }));
  }

  async findOne(id: string) {
    const challenge =  await this.prisma.challenge.findUnique({
      where: { id },

      include: {
        votes: true,
        participations: true,
        creator: {
          select: {
            userName: true,
          },
        },
      },
    });
    if(!challenge){
      return null
    }
    return {
      ...challenge,
      created_at: challenge.created_at?.toISOString(),
    };
  }

  update(id: string, updateChallengeDto: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: { id },
      data: updateChallengeDto,
    });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({
      where: { id },
    });
  }
}
