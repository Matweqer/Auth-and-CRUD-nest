import { Injectable } from '@nestjs/common';
import { LoginDto, RegistrationDto } from './dto';

@Injectable()
export class AuthService {
  async registration(registrationDto: RegistrationDto) {}

  async login(loginDto: LoginDto) {}

  async refreshTokens() {}
}
