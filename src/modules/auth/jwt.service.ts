import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { JwtPayload } from 'types';
import { AuthHelper } from './auth.helper';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    return this.nestJwtService.sign(payload, { expiresIn: '3m' });
  }

  generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    return this.nestJwtService.sign(payload, { expiresIn: '3d' });
  }

  generateTokens(user: User) {
    const access = this.generateAccessToken(user);
    const refresh = this.generateRefreshToken(user);
    return {
      access,
      refresh,
    };
  }

  verifyToken(token: string) {
    let verifiedToken;
    try {
      verifiedToken = this.nestJwtService.verify(token);
    } catch (e) {
      AuthHelper.throwTokenError();
    }
    return verifiedToken;
  }
}
