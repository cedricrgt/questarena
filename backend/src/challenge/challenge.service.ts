import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  create(createChallengeDto: CreateChallengeDto) {
    const { created_by, ...rest } = createChallengeDto;
   
    return this.prisma.challenge.create({
      
      data: {
        ...rest,
        creator: {
          connect: {
            id: created_by,
          },
        },
      }
      
    });
  }

  findAll() {
    return this.prisma.challenge.findMany();
  }

  findOne(id: string) {
    return this.prisma.challenge.findUnique({
      where: { id },
    });
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
