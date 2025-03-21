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
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('programs')
@UseGuards(AuthenticatedGuard)
export class ProgramsController {
  constructor(private readonly programService: ProgramsService) {}

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
