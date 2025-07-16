import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(private prisma: PrismaService) {}

 async create(createParticipationDto: CreateParticipationDto) {
  const { user_id, challenge_id, ...rest } = createParticipationDto;

  if (!user_id) {
    throw new BadRequestException('user_id est obligatoire');
  }
  if (!challenge_id) {
    throw new BadRequestException('challenge_id est obligatoire');
  }

  try {
    return await this.prisma.participation.create({
      data: {
        ...rest,
        validated: rest.validated ?? false,
        challenge: {
          connect: {
            id: challenge_id,
          },
        },
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  } catch (error) {
    throw new BadRequestException('Erreur lors de la création de la participation');
  }
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

  async update(id: string, updateParticipationDto: UpdateParticipationDto) {
  try {
    return await this.prisma.participation.update({
      where: { id },
      data: updateParticipationDto,
    });
  } catch (error) {
    throw new BadRequestException('Erreur lors de la mise à jour de la participation');
  }
}

async remove(id: string) {
  try {
    return await this.prisma.participation.delete({
      where: { id },
    });
  } catch (error) {
    throw new BadRequestException('Erreur lors de la suppression de la participation');
  }
}
}