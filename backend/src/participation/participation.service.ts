import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(private prisma: PrismaService) {}

  create(createParticipationDto: CreateParticipationDto) {
    const { users_id, ...rest } = createParticipationDto;

    return this.prisma.participation.create({
      data: {
        ...rest,
        validated: rest.validated ?? false,
        user: {
          connect: {
            id: users_id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.participation.findMany();
  }

  findOne(id: string) {
    return this.prisma.participation.findUnique({
      where: { id },
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