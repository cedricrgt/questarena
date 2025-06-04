import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { ParticipationOwnershipGuard } from './participation-ownership.guard';

@Module({
  controllers: [ParticipationController],
  providers: [ParticipationService, ParticipationOwnershipGuard],
})
export class ParticipationModule {}
