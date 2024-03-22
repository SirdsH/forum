import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Create a new user
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      role: 'user',
    });

    // Create a JWT payload
    const payload = { username: newUser.username, sub: newUser._id };

    // Sign the JWT using the JWT service
    const access_token = this.jwtService.sign(payload);

    // Return the user and the JWT
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
    try {
      // Validate user credentials against the database
      const dbUser = await this.validateUser(user.username, user.password);
      if (!dbUser) {
        // If the credentials are invalid, return an error message
        throw new Error('Invalid credentials');
      }

      // If the credentials are valid, create a JWT payload
      const payload = { username: dbUser.username, sub: dbUser._id };
      const access_token = this.jwtService.sign(payload);

      // Return the JWT to the user
      return { ...dbUser, access_token };
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      throw new Error(
        'An error occurred while logging in. Please try again later.',
      );
    }
  }

  async logout() {
    // Check if the localStorage object is available
    if (typeof sessionStorage !== 'undefined') {
      // Clear the user's authentication token from the client-side storage
      sessionStorage.removeItem('access_token');
    }

    // Redirect the user to the login page
    window.location.href = '/login';
  }

  isLoggedIn(): boolean {
    // Check if the localStorage object is available
    if (typeof sessionStorage !== 'undefined') {
      // Check if the user's authentication token is present in the client-side storage
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        return true;
      }
    }

    // If the user's authentication token is not present, the user is not logged in
    return false;
  }
}
