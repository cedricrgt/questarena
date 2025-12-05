import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(3)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins 8 caractères et un chiffre',
  })
  password: string;
}
