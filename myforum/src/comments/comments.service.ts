import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostDocument } from '../post/schema/post.schema';
import { CommentDocument } from './schema/comments.schema';
import { UserDocument } from '../users/schema/users.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
    @InjectModel('Posts') private postModel: Model<PostDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async createComment(
    post: PostDocument,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentDocument> {
    const author = await this.userModel.findById(createCommentDto.author);
    if (!author) {
      throw new Error('User not found');
    }
    const newComment = new this.commentModel({
      ...createCommentDto,
      author,
    });
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    return newComment;
  }

  async getCommentsByPostId(postId: string): Promise<CommentDocument[]> {
    // Using 'strict' comparison here, as the 'postId' and _id in the database are strings.
    const foundPost = await this.postModel.findById(postId, 'comments');
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }

    const comments = await this.commentModel
      .find({ _id: { $in: foundPost.comments } })
      .populate('author')
      .exec();

    if (!comments || comments.length === 0) {
      throw new NotFoundException('No comments found for the post');
    }

    return comments;
  }

  async deleteComment(
    postId: string,
    commentId: string,
  ): Promise<CommentDocument> {
    const post = await this.postModel.findById(postId).populate('comments');
    if (!post) {
      throw new Error('Comment or post not found');
    }

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId,
    );
    await post.save();

    return this.commentModel.findById(commentId);
  }
}
