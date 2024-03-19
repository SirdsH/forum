import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostDocument } from './schema/post.model';
import { CommentDocument } from './entities/comment.entity';
import { Like, LikeDocument } from './schema/like.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
  ) {}

  async createPost(post: Posts) {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async getPosts(): Promise<Posts[]> {
    return this.postModel.find().populate('comments').populate('likes').exec();
  }

  async getPostById(id: string): Promise<Posts> {
    return this.postModel
      .findById(id)
      .populate('comments')
      .populate('likes')
      .exec();
  }

  async createComment(postId: string, comment: Comment): Promise<Posts> {
    const newComment = new this.commentModel(comment);
    return this.postModel
      .findByIdAndUpdate(
        postId,
        { $push: { comments: newComment } },
        { new: true },
      )
      .populate('comments')
      .populate('likes')
      .exec();
  }

  async createLike(postId: string, like: Like): Promise<Posts> {
    const newLike = new this.likeModel(like);
    return this.postModel
      .findByIdAndUpdate(postId, { $push: { likes: newLike } }, { new: true })
      .populate('comments')
      .populate('likes')
      .exec();
  }
}
