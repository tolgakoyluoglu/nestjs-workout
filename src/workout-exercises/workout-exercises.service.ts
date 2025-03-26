import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateWorkoutExerciseDto,
  UpdateWorkoutExerciseDto,
} from './dto/index';

@Injectable()
export class WorkoutExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    programId: string,
    workoutId: string,
    createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    await this.verifyWorkoutAccess(userId, programId, workoutId);
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: createWorkoutExerciseDto.exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(
        `Exercise with ID ${createWorkoutExerciseDto.exerciseId} not found`,
      );
    }

    // Add exercise in correct order
    const highestOrder = await this.prisma.workoutExercise.findFirst({
      where: { workoutId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const order = highestOrder ? highestOrder.order + 1 : 0;

    return this.prisma.workoutExercise.create({
      data: {
        ...createWorkoutExerciseDto,
        order,
        workoutId,
      },
      include: {
        exercise: true,
      },
    });
  }

  async findAll(userId: string, programId: string, workoutId: string) {
    await this.verifyWorkoutAccess(userId, programId, workoutId);
    return this.prisma.workoutExercise.findMany({
      where: { workoutId },
      include: {
        exercise: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async update(
    id: string,
    userId: string,
    programId: string,
    workoutId: string,
    updateWorkoutExerciseDto: UpdateWorkoutExerciseDto,
  ) {
    await this.verifyWorkoutAccess(userId, programId, workoutId);
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id },
    });

    if (!workoutExercise || workoutExercise.workoutId !== workoutId) {
      throw new NotFoundException(
        `Exercise with ID ${id} not found in workout ${workoutId}`,
      );
    }

    return this.prisma.workoutExercise.update({
      where: { id },
      data: updateWorkoutExerciseDto,
      include: {
        exercise: true,
      },
    });
  }

  async remove(
    id: string,
    userId: string,
    programId: string,
    workoutId: string,
  ) {
    await this.verifyWorkoutAccess(userId, programId, workoutId);
    const workoutExercise = await this.prisma.workoutExercise.findUnique({
      where: { id },
    });

    if (!workoutExercise || workoutExercise.workoutId !== workoutId) {
      throw new NotFoundException(
        `Exercise with ID ${id} not found in workout ${workoutId}`,
      );
    }

    return this.prisma.workoutExercise.delete({ where: { id } });
  }

  // Helper method to verify workout access
  private async verifyWorkoutAccess(
    userId: string,
    programId: string,
    workoutId: string,
  ) {
    const program = await this.prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }
    if (program.userId !== userId) {
      throw new ForbiddenException('You do not have access to this program');
    }

    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workout || workout.programId !== programId) {
      throw new NotFoundException(
        `Workout with ID ${workoutId} not found in program ${programId}`,
      );
    }
  }
}
