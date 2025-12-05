import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthentificationService } from 'src/authentification/authentification.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthentificationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou mal formaté');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const decodedToken = await this.authService.decodeToken(token);

    if (decodedToken.role !== 'ADMIN') {
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    // Attach user to request for later use
    request.user = decodedToken;

    return true;
  }
}
