import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  message: string;
}
