import { Injectable } from '@nestjs/common';
import { OwnershipGuard } from 'src/auth-guard/ownership.guard';
import { ChallengeService } from './challenge.service';
import { AuthentificationService } from 'src/authentification/authentification.service';

@Injectable()
export class ChallengeOwnershipGuard extends OwnershipGuard {
  constructor(challengeService: ChallengeService, authService: AuthentificationService) {
    super(challengeService,authService );
  }
}