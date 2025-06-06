import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateWorkoutDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
