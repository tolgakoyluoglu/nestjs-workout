import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateWorkoutExerciseDto {
  @IsNotEmpty()
  @IsString()
  exerciseId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sets: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  reps: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  restTime?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
