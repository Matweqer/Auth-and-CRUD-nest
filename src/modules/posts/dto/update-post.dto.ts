import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;
}
