import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Posts } from './schema/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req) {
    // Get user id from the JWT token
    const userId = req.user.id;

    return await this.postService.createPost(createPostDto, userId);
  }

  @Get()
  getPosts(): Promise<Posts[]> {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string): Promise<Posts> {
    return this.postService.remove(id);
  }

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() post: any) {
    post._id = id;
    return this.postService.updatePost(post);
  }
}
