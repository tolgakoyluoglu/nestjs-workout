import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('exercises')
@UseGuards(AuthenticatedGuard)
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}

  @Get()
  findAll(@Query('search') search?: string, @Query('muscle') muscle?: string) {
    return this.exerciseService.findAll(search, muscle);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }
}
