import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  //from CanActivate interface
  canActivate(context: ExecutionContext): boolean {
    //convert request to express HTTP request
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log(authHeader);

    // Check if the header exists and starts with "Bearer "
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not found');
    }

    const token = authHeader.split(' ')[1]; // Get the token part only

    try {
      const decoded = this.jwt.verify(token); // Check if token is valid
      //decoded = {sub : userId}
      request.user = decoded; // Store the user info in request
      return true; // Allow access
    } catch {
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
