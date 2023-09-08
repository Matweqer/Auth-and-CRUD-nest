import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { NotContainsCyrillic } from 'validators';

export class RegistrationDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @NotContainsCyrillic()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @NotContainsCyrillic()
  password: string;
}
