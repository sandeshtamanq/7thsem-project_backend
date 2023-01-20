import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(25)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(25)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  contactNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
  address: string;
}
