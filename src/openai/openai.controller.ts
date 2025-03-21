import { Controller, Get, Query } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('generate-workout')
  async generateWorkout(@Query('goal') goal: string) {
    const prompt = `Create a workout plan for someone whose goal is ${goal}.`;
    return { workout: await this.openAiService.generateWorkout(prompt) };
  }
}
