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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/index';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('programs/:programId/workouts')
@UseGuards(AuthenticatedGuard)
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) {}

  @Post()
  create(
    @Request() req,
    @Param('programId') programId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutService.create(req.user.id, programId, createWorkoutDto);
  }

  @Get()
  findAll(@Request() req, @Param('programId') programId: string) {
    return this.workoutService.findAllByProgram(req.user.id, programId);
  }

  @Get(':id')
  findOne(
    @Request() req,
    @Param('programId') programId: string,
    @Param('id') id: string,
  ) {
    return this.workoutService.findOne(id, programId, req.user.id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('programId') programId: string,
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(
      id,
      programId,
      req.user.id,
      updateWorkoutDto,
    );
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('programId') programId: string,
    @Param('id') id: string,
  ) {
    return this.workoutService.remove(id, programId, req.user.id);
  }
}
