import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schema/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: User) {
    const newUser: any = await this.usersService.createUser(user);
    const payload = { username: newUser.username, sub: newUser._id };
    const access_token = this.jwtService.sign(payload);
    return { ...newUser, access_token };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser({ username });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
