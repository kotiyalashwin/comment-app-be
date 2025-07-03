import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { NewCommentDTO } from './dto/new-comment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/security/guard/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  //add comment
  @Post('new')
  @UseGuards(AuthGuard)
  create(@Body() comment: NewCommentDTO, @Req() req: any) {
    return this.commentService.create(req.user.sub, comment);
  }

  //getcommentbyid
  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateComment(
    @Param('id') id: string,
    @Req() req: any,
    @Body() comment: NewCommentDTO,
  ) {
    const userId = req.user.sub;
    return this.commentService.editComment(id, comment, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteComment(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.commentService.deleteComment(id, userId);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  restoreComment(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.commentService.restoreComment(id, userId);
  }
}
