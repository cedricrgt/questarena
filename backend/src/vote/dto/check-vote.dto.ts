import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TargetType } from '@prisma/client';

export class CheckVoteDto {
  @IsNumber()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  target_id: string;

  @IsEnum(TargetType)
  target_type: TargetType;
}