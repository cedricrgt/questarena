import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(private prisma: PrismaService) {}

  create(createParticipationDto: CreateParticipationDto) {
  const { user_id, challenge_id, ...rest } = createParticipationDto;

  return this.prisma.participation.create({
    data: {
      ...rest,
      validated: rest.validated ?? false,
      challenge:{
        connect:{
          id:challenge_id
        }
      } , 
      user: {
        connect: {
          id: user_id,
        },
      },
      
    },
  });
}

  findAll() {
    return this.prisma.participation.findMany({
      include:{
        user:true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.participation.findUnique({
      where: { id },
      include:{
        user:true
      }
    });
  }

  update(id: string, updateParticipationDto: UpdateParticipationDto) {
    return this.prisma.participation.update({
      where: { id },
      data: updateParticipationDto,
    });
  }

  remove(id: string) {
    return this.prisma.participation.delete({
      where: { id },
    });
  }
}