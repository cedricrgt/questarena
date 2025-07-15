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

  async findAll() {
    const participations = await this.prisma.participation.findMany();
    return participations.map(participation => ({
      ...participation,
      created_at: participation.created_at?.toISOString(),
   }));
  }

  async findOne(id: string) {
  const participation = await this.prisma.participation.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!participation) return null;

  return {
    ...participation,
    createdAt: participation.created_at?.toISOString(),

  };
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