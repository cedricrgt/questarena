import {CanActivate,ExecutionContext,Injectable, UnauthorizedException,ForbiddenException,} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly resourceService: any, 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const resourceId = request.params.id; 
    if (!resourceId) {
      throw new UnauthorizedException('ID de ressource manquant');
    }

    const resource = await this.resourceService.findOne(resourceId);

    if (!resource) {
      throw new UnauthorizedException('Ressource introuvable');
    }

    if (resource.userId !== user.id) {
      throw new ForbiddenException('Accès refusé : vous n’êtes pas le propriétaire');
    }

    return true;
  }
}