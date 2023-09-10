import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class AuthHelper {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  static async comparePasswords(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(userPassword, hashedPassword);
  }

  static throwLoginError(): void {
    throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
  }

  static throwRegistrationError(email: string): void {
    throw new HttpException(
      `Email ${email} is already in use`,
      HttpStatus.BAD_REQUEST,
    );
  }

  static throwTokenError(): void {
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
