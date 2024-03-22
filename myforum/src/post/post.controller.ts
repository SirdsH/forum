import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/schema/users.model';
import { Posts } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Body('author') author: User,
  ): Promise<Posts> {
    return this.postService.createPost(createPostDto, author);
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<Posts> {
    return this.postService.getPost(id);
  }

  @Get()
  async getAllPosts(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  @Post('delete/:id')
  async deletePost(@Param('id') id: string): Promise<Posts> {
    return this.postService.deletePost(id);
  }

  @Post('update/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: CreatePostDto,
  ): Promise<Posts> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get('user/:id')
  async getPostsByUser(@Param('id') id: string): Promise<Posts[]> {
    return this.postService.getPostsByUser(id);
  }
}
