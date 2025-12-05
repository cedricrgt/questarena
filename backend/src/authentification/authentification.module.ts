import { Module, forwardRef } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { UserModule } from '../user/user.module';
import { AuthentificationController } from './authentification.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthentificationService],
  controllers: [AuthentificationController],
  exports: [AuthentificationService], 

})
export class AuthentificationModule {}