import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/index';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProgramDto: CreateProgramDto) {
    return this.prisma.program.create({
      data: {
        ...createProgramDto,
        userId,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.program.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        workouts: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    if (program.userId !== userId) {
      throw new ForbiddenException('You do not have access to this program');
    }

    return program;
  }

  async update(id: string, userId: string, updateProgramDto: UpdateProgramDto) {
    const program = await this.prisma.program.findUnique({ where: { id } });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    if (program.userId !== userId) {
      throw new ForbiddenException('You do not have access to this program');
    }

    return this.prisma.program.update({
      where: { id },
      data: updateProgramDto,
    });
  }

  async remove(id: string, userId: string) {
    const program = await this.prisma.program.findUnique({ where: { id } });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    if (program.userId !== userId) {
      throw new ForbiddenException('You do not have access to this program');
    }

    return this.prisma.program.delete({ where: { id } });
  }
}
