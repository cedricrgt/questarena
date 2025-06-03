import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto) {
    return this.prisma.vote.create({
      data: createVoteDto,
    });
  }

  findAll() {
    return this.prisma.vote.findMany();
  }

  findOne(id: string) {
    return this.prisma.vote.findUnique({
      where: { id },
    });
  }

  update(id: string, updateVoteDto: UpdateVoteDto) {
    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  remove(id: string) {
    return this.prisma.vote.delete({
      where: { id },
    });
  }
}