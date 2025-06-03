import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { VoteOwnershipGuard } from './vote-ownership.guard';


@Module({
  controllers: [VoteController],
  providers: [VoteService, VoteOwnershipGuard],
})
export class VoteModule {}
