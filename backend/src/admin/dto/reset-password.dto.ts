import { IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d).{8,}$/, {
    message: 'Le mot de passe doit contenir au moins 8 caractères et un chiffre',
  })
  newPassword: string;
}
