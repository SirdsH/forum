import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/users.model';
import { PostDocument } from './schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Posts') private postModel: Model<PostDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}
  async createPost(createPostDto: CreatePostDto, user: User) {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: user,
    });
    return createdPost.save();
  }

  async getPost(id: string) {
    return this.postModel.findById(id).populate('author').exec();
  }

  async getAllPosts() {
    return this.postModel.find().populate('author').exec();
  }

  async deletePost(id: string) {
    return this.postModel.findByIdAndDelete(id).exec();
  }

  async updatePost(id: string, updatePostDto: CreatePostDto) {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  // Get posts of a user by his id, not username
  async getPostsByUser(userId: string) {
    return this.postModel.find({ author: userId }).populate('author').exec();
  }
}
