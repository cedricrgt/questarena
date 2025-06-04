import { Injectable } from '@nestjs/common';
import { OwnershipGuard } from 'src/auth-guard/ownership.guard';
import { ChallengeService } from './challenge.service';

@Injectable()
export class ChallengeOwnershipGuard extends OwnershipGuard {
  constructor(challengeService: ChallengeService) {
    super(challengeService);
  }
}