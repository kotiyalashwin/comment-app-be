import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing)
      throw new UnauthorizedException('User already exists. Login.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser(email, hashedPassword);
    const token = this.jwtService.sign({ sub: user.id });

    return { token, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwtService.sign({ sub: user.id });

    return { token, message: `Welcome : ${user.email}` };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
