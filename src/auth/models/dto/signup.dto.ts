import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MaxLength(25)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(25)
  lastName: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
  email: string;

  @IsNotEmpty()
  contactNumber: number;

  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  address: string;
}
