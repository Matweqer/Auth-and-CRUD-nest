import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
