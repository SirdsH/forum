import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schema/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Posts') private postModel: Model<PostDocument>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostDto, token: string) {
    try {
      // Verify the token
      const decoded = await this.jwtService.verifyAsync(token);

      // Check if the token is valid
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      // Use the decoded token to get the user
      const user = await this.usersService.getUser({ _id: decoded.sub });

      // Check if the user exists
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Create the post
      const newPost = new this.postModel({
        ...createPostDto,
        author: user._id,
      });

      return newPost.save();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getPosts() {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<PostDocument> {
    return this.postModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }

  async remove(id: string): Promise<PostDocument> {
    if (!id) {
      throw new BadRequestException('Invalid id');
    }
    const postId = new Types.ObjectId(id);
    return this.postModel.findOneAndDelete({ _id: postId }).exec();
  }

  async updatePost(post: any): Promise<PostDocument> {
    if (!post._id) {
      throw new BadRequestException('Invalid id');
    }
    const postId = new Types.ObjectId(post._id);
    return this.postModel
      .findOneAndUpdate({ _id: postId }, post, { new: true })
      .exec();
  }
}
