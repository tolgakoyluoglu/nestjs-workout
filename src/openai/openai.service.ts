import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateWorkout(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a fitness coach.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
      });

      return response.choices[0]?.message?.content || 'No response from AI';
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to generate workout plan');
    }
  }
}
