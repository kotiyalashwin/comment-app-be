import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDTO, NewUserDTO } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: NewUserDTO, @Res() res: Response) {
    const { token, email } = await this.authService.register(
      body.email,
      body.password,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true in production (HTTPS)
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.json({ user: email });
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const { token, message } = await this.authService.login(
      body.email,
      body.password,
    );

    return message;
  }
}
