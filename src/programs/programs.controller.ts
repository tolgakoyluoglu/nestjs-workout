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
import { ProgramsService } from './programs.service';
import { CreateProgramDto, UpdateProgramDto } from './dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { OpenAiService } from '../openai/openai.service';
import { GenerateWorkoutDto } from '../openai/dto/workout-generator.dto';
import { WorkoutsService } from '../workouts/workouts.service';
import { WorkoutExercisesService } from '../workout-exercises/workout-exercises.service';

@Controller('programs')
@UseGuards(AuthenticatedGuard)
export class ProgramsController {
  constructor(
    private readonly programService: ProgramsService,
    private readonly openAiService: OpenAiService,
    private readonly workoutsService: WorkoutsService,
    private readonly workoutExercisesService: WorkoutExercisesService,
  ) {}

  @Post('generate')
  async generateProgram(
    @Request() req,
    @Body() generateWorkoutDto: GenerateWorkoutDto,
  ) {
    // Generate the workout plan using OpenAI
    const generatedPlan =
      await this.openAiService.generateWorkoutPlan(generateWorkoutDto);

    // Create a new program
    const program = await this.programService.create(req.user.id, {
      name: generatedPlan.name,
      description: generatedPlan.description,
    });

    // Create workouts for the program
    for (let i = 0; i < generatedPlan.workouts.length; i++) {
      const workout = generatedPlan.workouts[i];

      // Create the workout
      const createdWorkout = await this.workoutsService.create(
        req.user.id,
        program.id,
        {
          name: workout.name,
          description: `Day ${i + 1} of your program`,
        },
      );

      // Add exercises to the workout
      for (let j = 0; j < workout.exercises.length; j++) {
        const exercise = workout.exercises[j];

        await this.workoutExercisesService.create(
          req.user.id,
          program.id,
          createdWorkout.id,
          {
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            restTime: exercise.restTime,
            notes: exercise.notes,
          },
        );
      }
    }

    return program;
  }
  @Post()
  create(@Request() req, @Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(req.user.id, createProgramDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.programService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.programService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programService.update(id, req.user.id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.programService.remove(id, req.user.id);
  }
}
