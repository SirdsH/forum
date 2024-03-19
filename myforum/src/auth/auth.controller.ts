import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: object) {
    return this.authService.login(body);
  }

}
