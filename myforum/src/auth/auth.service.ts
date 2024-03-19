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
    const access_token = this.jwtService.sign(payload);

    // Store the access token in the localStorage object
    localStorage.setItem('access_token', access_token);

    return {
      access_token,
    };
  }


  async logout() {
    // Check if the localStorage object is available
    if (typeof localStorage !== 'undefined') {
      // Clear the user's authentication token from the client-side storage
      localStorage.removeItem('access_token');
    }

    // Redirect the user to the login page
    window.location.href = '/login';
  }

  isLoggedIn(): boolean {
    // Check if the localStorage object is available
    if (typeof localStorage !== 'undefined') {
      // Check if the user's authentication token is present in the client-side storage
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        return true;
      }
    }

    // If the user's authentication token is not present, the user is not logged in
    return false;
  }
}
