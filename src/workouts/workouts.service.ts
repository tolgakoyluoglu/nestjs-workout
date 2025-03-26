import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/index';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    programId: string,
    createWorkoutDto: CreateWorkoutDto,
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

    const highestOrder = await this.prisma.workout.findFirst({
      where: { programId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const order = highestOrder ? highestOrder.order + 1 : 0;

    return this.prisma.workout.create({
      data: {
        ...createWorkoutDto,
        order,
        programId,
      },
    });
  }

  async findAllByProgram(userId: string, programId: string) {
    const program = await this.prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }

    if (program.userId !== userId) {
      throw new ForbiddenException('You do not have access to this program');
    }

    return this.prisma.workout.findMany({
      where: { programId },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string, programId: string, userId: string) {
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
      where: { id },
      include: {
        workoutExercises: {
          include: { exercise: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!workout || workout.programId !== programId) {
      throw new NotFoundException(
        `Workout with ID ${id} not found in program ${programId}`,
      );
    }

    return workout;
  }

  async update(
    id: string,
    programId: string,
    userId: string,
    updateWorkoutDto: UpdateWorkoutDto,
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
      where: { id },
    });

    if (!workout || workout.programId !== programId) {
      throw new NotFoundException(
        `Workout with ID ${id} not found in program ${programId}`,
      );
    }

    return this.prisma.workout.update({
      where: { id },
      data: updateWorkoutDto,
    });
  }

  async remove(id: string, programId: string, userId: string) {
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
      where: { id },
    });

    if (!workout || workout.programId !== programId) {
      throw new NotFoundException(
        `Workout with ID ${id} not found in program ${programId}`,
      );
    }

    return this.prisma.workout.delete({ where: { id } });
  }
}
