import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return {
      user: req.user,
      message: 'Login successful',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
}
