import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';


@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  async create(createChallengeDto: CreateChallengeDto) {
    try{
    const { user_id, image_url, ...rest } = createChallengeDto;
    const finalImageUrl =
      image_url?.trim() ||
      `https://via.assets.so/game.webp?id=${Math.floor(Math.random() * 50) + 1}`;
    return await this.prisma.challenge.create({
      data: {
        ...rest,
        image_url: finalImageUrl,
        creator: {
          connect: {
            id: user_id,
          },
        },
      },
    });}
    catch(error){
      throw new BadRequestException('invalid data')
    }
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

  async update(id: string, updateChallengeDto: UpdateChallengeDto) {
    try{
    return await this.prisma.challenge.update({
      where: { id },
      data: updateChallengeDto,
    });}
    catch(error){
       throw new BadRequestException('invalid data')
    }
  }

  async remove(id: string) {
    return await this.prisma.challenge.delete({
      where: { id },
    });
  }
}
