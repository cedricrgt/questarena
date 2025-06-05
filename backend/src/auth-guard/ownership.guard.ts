import {CanActivate,ExecutionContext,Injectable, UnauthorizedException,ForbiddenException,} from '@nestjs/common';
import { AuthentificationService } from 'src/authentification/authentification.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly resourceService: any, 
    private readonly authService: AuthentificationService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

     const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou mal formaté');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    const decodedToken = this.authService.decodeToken(token)

    const resourceId = request.params.id; 
    if (!resourceId) {
      throw new UnauthorizedException('ID de ressource manquant');
    }
   
    const resource = await this.resourceService.findOne(resourceId);
    if (!resource) {
      throw new UnauthorizedException('Ressource introuvable');
    }
    
    if (resource.user_id !== decodedToken.id) {
      throw new ForbiddenException('Accès refusé : vous n’êtes pas le propriétaire');
    }

    return true;
  }
}