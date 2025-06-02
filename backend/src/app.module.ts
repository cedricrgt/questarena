import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ParticipationModule } from './participation/participation.module';
import { VoteModule } from './vote/vote.module';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from './authentification/authentification.module';

@Module({
  imports: [UserModule, ChallengeModule, ParticipationModule, VoteModule, AuthentificationModule, ConfigModule.forRoot({
      isGlobal: true, 
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
