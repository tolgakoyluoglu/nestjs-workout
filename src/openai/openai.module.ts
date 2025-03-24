import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { OpenAiController } from './openai.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
