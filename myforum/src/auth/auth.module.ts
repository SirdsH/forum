import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { User, UserSchema } from '../users/schema/users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
