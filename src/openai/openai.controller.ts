import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { GenerateWorkoutDto } from './dto/workout-generator.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Controller('ai')
@UseGuards(AuthenticatedGuard)
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('generate-workout')
  generateWorkout(@Body() generateWorkoutDto: GenerateWorkoutDto) {
    return this.openAiService.generateWorkoutPlan(generateWorkoutDto);
  }
}
