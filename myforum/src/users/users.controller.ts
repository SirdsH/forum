import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getUser')
  getUser(@Body() query: object) {
    return this.usersService.getUser(query);
  }
}
