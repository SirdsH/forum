import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
