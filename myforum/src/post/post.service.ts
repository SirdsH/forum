import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostDocument } from './schema/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
  ) {}

  async createPost(post: Posts) {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async getPosts() {
    return this.postModel.find().exec();
  }

  async getPostById(id: string) {
    return this.postModel.findById(id).exec();
  }
}
