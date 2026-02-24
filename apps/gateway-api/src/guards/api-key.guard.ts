import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    if (apiKey !== 'test123') {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
