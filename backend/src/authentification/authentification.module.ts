import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { UserModule } from '../user/user.module';
import { AuthentificationController } from './authentification.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [UserModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
      })
  ],
  providers: [AuthentificationService],
  controllers: [AuthentificationController],
})
export class AuthentificationModule {}