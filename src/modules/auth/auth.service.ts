import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthHelper } from './auth.helper';
import { JwtService } from './jwt.service';

import { User } from './entities/user.entity';

import { LoginDto, RefreshTokensDto, RegistrationDto } from './dto';

import { JwtPayload } from 'types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async registration(registrationDto: RegistrationDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registrationDto.email },
    });
    if (existingUser) AuthHelper.throwRegistrationError(registrationDto.email);

    const hashedPassword = AuthHelper.hashPassword(registrationDto.password);
    const newUser = await this.usersRepository.create({
      ...registrationDto,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) AuthHelper.throwLoginError();

    const isPasswordCorrect = await AuthHelper.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!isPasswordCorrect) AuthHelper.throwLoginError();

    const tokens = this.jwtService.generateTokens(user);

    return { ...tokens };
  }

  async refreshTokens(refreshTokensDto: RefreshTokensDto) {
    const decodedToken: JwtPayload = this.jwtService.verifyToken(
      refreshTokensDto.refreshToken,
    );
    const user = await this.usersRepository.findOneBy({ id: decodedToken.id });
    if (!user) AuthHelper.throwTokenError();

    const tokens = this.jwtService.generateTokens(user);

    return {
      ...tokens,
    };
  }
}
