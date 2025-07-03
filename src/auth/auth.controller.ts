import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, NewUserDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: NewUserDTO) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body.email, body.password);
  }
}
