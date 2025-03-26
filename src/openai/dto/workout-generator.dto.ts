import { IsInt, IsEnum, Min, Max } from 'class-validator';

export enum FitnessGoal {
  MUSCLE_GAIN = 'muscle_gain',
  WEIGHT_LOSS = 'weight_loss',
  BALANCED = 'balanced',
}

export class GenerateWorkoutDto {
  @IsInt()
  @Min(1)
  @Max(7)
  daysPerWeek: number;

  @IsEnum(FitnessGoal)
  goal: FitnessGoal;

  @IsInt()
  @Min(30)
  @Max(90)
  sessionMinutes: number;
}

export class GeneratedWorkoutPlan {
  id: string;
  name: string;
  description: string;
  workouts: GeneratedWorkout[];
}

export class GeneratedWorkout {
  name: string;
  exercises: GeneratedExercise[];
}

export class GeneratedExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: number;
  restTime?: number;
  notes?: string;
}
