import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async createUser(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query).exec();
  }
}
