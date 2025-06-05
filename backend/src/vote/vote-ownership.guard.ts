import { Injectable } from '@nestjs/common';
import { OwnershipGuard } from 'src/auth-guard/ownership.guard';
import { VoteService } from './vote.service';
import { AuthentificationService } from 'src/authentification/authentification.service';

@Injectable()
export class VoteOwnershipGuard extends OwnershipGuard {
  constructor(voteService: VoteService,  authService: AuthentificationService) {
    super(voteService, authService);
  }
}