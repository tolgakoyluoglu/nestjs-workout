import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkoutExercisesService } from './workout-exercises.service';
import {
  CreateWorkoutExerciseDto,
  UpdateWorkoutExerciseDto,
} from './dto/index';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('programs/:programId/workouts/:workoutId/exercises')
@UseGuards(AuthenticatedGuard)
export class WorkoutExercisesController {
  constructor(
    private readonly workoutExerciseService: WorkoutExercisesService,
  ) {}

  @Post()
  create(
    @Request() req,
    @Param('programId') programId: string,
    @Param('workoutId') workoutId: string,
    @Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    return this.workoutExerciseService.create(
      req.user.id,
      programId,
      workoutId,
      createWorkoutExerciseDto,
    );
  }

  @Get()
  findAll(
    @Request() req,
    @Param('programId') programId: string,
    @Param('workoutId') workoutId: string,
  ) {
    return this.workoutExerciseService.findAll(
      req.user.id,
      programId,
      workoutId,
    );
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('programId') programId: string,
    @Param('workoutId') workoutId: string,
    @Param('id') id: string,
    @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto,
  ) {
    return this.workoutExerciseService.update(
      id,
      req.user.id,
      programId,
      workoutId,
      updateWorkoutExerciseDto,
    );
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('programId') programId: string,
    @Param('workoutId') workoutId: string,
    @Param('id') id: string,
  ) {
    return this.workoutExerciseService.remove(
      id,
      req.user.id,
      programId,
      workoutId,
    );
  }
}
