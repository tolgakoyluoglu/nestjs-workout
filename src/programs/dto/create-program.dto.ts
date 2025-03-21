import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
