import { Injectable } from '@nestjs/common';
import { OwnershipGuard } from 'src/auth-guard/ownership.guard';
import { ParticipationService } from './participation.service';

@Injectable()
export class ParticipationOwnershipGuard extends OwnershipGuard {
  constructor(participationService: ParticipationService) {
    super(participationService);
  }
}