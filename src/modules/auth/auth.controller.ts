import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('refresh-tokens')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
