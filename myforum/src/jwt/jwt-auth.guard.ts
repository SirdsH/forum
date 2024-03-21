import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const access_token = authorization.split(' ')[1];
    console.log(access_token);

    try {
      request.user = this.jwtService.verify(access_token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    // Add additional custom logic here based on the user's roles or permissions
    // For example, check if the user is an admin

    return super.canActivate(context);
  }
}
