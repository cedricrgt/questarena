import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { TargetType } from '@prisma/client';
import { CheckVoteDto } from './dto/check-vote.dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  create(createVoteDto: CreateVoteDto) {
    const { user_id, target_id, target_type, ...rest } = createVoteDto;
    if (!target_id) {
      throw new Error('target_id est obligatoire');
    }

    let targetData: Record<string, any> = {};
    if (target_type === TargetType.CHALLENGE) {
      targetData = {
        challenge: {
          connect: { id: target_id },
        },
      };
    } else if (target_type === TargetType.PARTICIPATION) {
      targetData = {
        participation: {
          connect: { id: target_id },
        },
      };
    } else {
      throw new Error('target_type invalide');
    }
    return this.prisma.vote.create({
      data: {
        ...rest,
        target_type,
        ...targetData,

        user: {
          connect: {
            id: user_id,
          },
        },
      },
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

  findByTargetId(targetId: string) {
    return this.prisma.vote.findMany({
      where: {
        OR: [{ challenge_id: targetId }, { participation_id: targetId }],
      },
      include: {
        challenge: true,
        participation: true,
      },
    });
  }

  async hasVoted(
    checkVoteDto: CheckVoteDto,
  ): Promise<{ hasVoted: boolean; voteId?: string }> {
    const { user_id, target_id, target_type } = checkVoteDto;

    const result = await this.prisma.vote.findFirst({
      where: {
        user_id,
        ...(target_type === TargetType.CHALLENGE
          ? { challenge_id: target_id }
          : { participation_id: target_id }),
      },
    });

    if (result) {
      return { hasVoted: true, voteId: result.id };
    }
    return { hasVoted: false, voteId: undefined };
  }
}
