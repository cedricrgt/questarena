import { Injectable } from '@nestjs/common';
import { OwnershipGuard } from 'src/auth-guard/ownership.guard';
import { VoteService } from './vote.service';

@Injectable()
export class VoteOwnershipGuard extends OwnershipGuard {
  constructor(voteService: VoteService) {
    super(voteService);
  }
}