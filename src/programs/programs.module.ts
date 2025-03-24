import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OpenAiModule } from '../openai/openai.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { WorkoutExercisesModule } from '../workout-exercises/workout-exercises.module';

@Module({
  imports: [PrismaModule, OpenAiModule, WorkoutsModule, WorkoutExercisesModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}
