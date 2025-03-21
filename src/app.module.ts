import { Module } from '@nestjs/common';
import { OpenAiService } from './openai/openai.service';
import { OpenAiController } from './openai/openai.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProgramsModule } from './programs/programs.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ConfigModule } from '@nestjs/config';
import { WorkoutExercisesModule } from './workout-exercises/workout-exercises.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
    WorkoutsModule,
    ExercisesModule,
    WorkoutExercisesModule,
  ],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class AppModule {}
