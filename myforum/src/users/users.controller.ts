import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getUser')
  async getUser(@Body() body: any) {
    return this.usersService.getUser(body);
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
