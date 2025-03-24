import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import {
  GenerateWorkoutDto,
  FitnessGoal,
  GeneratedWorkoutPlan,
} from './dto/workout-generator.dto';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateWorkoutPlan(
    dto: GenerateWorkoutDto,
  ): Promise<GeneratedWorkoutPlan> {
    // 1. Fetch all exercises from the database
    const exercises = await this.prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        musclesPrimary: true,
        musclesSecondary: true,
        difficulty: true,
        equipmentNeeded: true,
      },
    });

    // 2. Create a detailed system prompt
    const systemPrompt = this.createSystemPrompt(exercises);

    // 3. Create the user prompt based on preferences
    const userPrompt = this.createUserPrompt(dto);

    try {
      // 4. Call OpenAI to generate the workout plan
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      // 5. Parse the response and return the workout plan
      const content = response.choices[0]?.message?.content || '{}';
      const workoutPlan = JSON.parse(content) as GeneratedWorkoutPlan;

      // Ensure the workout plan has an ID
      workoutPlan.id = uuidv4();

      return workoutPlan;
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to generate workout plan');
    }
  }

  private createSystemPrompt(exercises: any[]): string {
    const exerciseData = exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      musclesPrimary: ex.musclesPrimary,
      musclesSecondary: ex.musclesSecondary,
      difficulty: ex.difficulty,
      equipmentNeeded: ex.equipmentNeeded,
    }));

    return `
You are a professional fitness coach with deep expertise in creating personalized workout programs. 
You have access to the following exercises in the database:

${JSON.stringify(exerciseData)}

Your task is to create a complete workout program based on the user's preferences.
Use ONLY exercises from the provided list.

Follow these guidelines:
1. Balance exercises across different muscle groups appropriate for the user's goals
2. Ensure proper rest between training the same muscle groups
3. Structure the plan with appropriate volume (sets/reps) based on the goal (muscle gain vs weight loss)
4. Stay within the specified workout duration
5. Include appropriate rest periods between sets

Your response should be in JSON format with this structure:
{
  "name": "Program name based on goals",
  "description": "Brief description of the program and expected results",
  "workouts": [
    {
      "name": "Workout name (e.g., 'Day 1: Upper Body')",
      "exercises": [
        {
          "exerciseId": "ID of the exercise from the database",
          "name": "Name of the exercise",
          "sets": number,
          "reps": number,
          "restTime": number (seconds),
          "notes": "Any specific notes about form or intensity"
        }
      ]
    }
  ]
}

Important:
- ONLY include exercises from the provided database list
- Use the exact exercise IDs from the database
- Make sure the total workout fits within the requested duration
- For muscle gain: focus on compound movements, 3-5 sets, 8-12 reps, 60-90s rest
- For weight loss: include more metabolic exercises, 3-4 sets, 12-15 reps, 30-60s rest
`;
  }

  private createUserPrompt(dto: GenerateWorkoutDto): string {
    const goalText =
      dto.goal === FitnessGoal.MUSCLE_GAIN
        ? 'muscle gain (hypertrophy)'
        : 'weight loss (fat loss)';

    return `
Please create a workout program with the following specifications:
- Number of workouts per week: ${dto.daysPerWeek}
- Goal: ${goalText}
- Session duration: ${dto.sessionMinutes} minutes per workout

I want a structured program that I can follow consistently with specific sets, reps, and rest periods tailored to my goals.
`;
  }

  // The original generateWorkout method can be kept for simpler text-based responses
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
