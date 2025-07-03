import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewCommentDTO } from './dto/new-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, comment: NewCommentDTO) {
    return this.prisma.comment.create({
      data: {
        content: comment.content,
        parentId: comment.parentId || null,
        userId,
      },
    });
  }

  async getCommentById(id: string) {
    const comment = this.prisma.comment.findUnique({
      where: { id },
      include: {
        replies: {
          include: {
            replies: true,
            user: true,
          },
        },
      },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  //    async getTopLevelComments() {
  //     return this.prisma.comment.findMany({
  //       where: { parentId: null },
  //       include: {
  //         replies: true,
  //         user: true,
  //       },
  //     });
  //   }

  async editComment(id: string, content: NewCommentDTO, userId: string) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    const now = new Date();
    const createdAt = new Date(comment.createdAt);

    const diffTime = (now.getTime() - createdAt.getTime()) / 60000;
    if (diffTime > 15)
      throw new ForbiddenException('You can only edit comment within 15mins.');

    await this.prisma.comment.update({
      where: { id },
      data: {
        content: content.content,
      },
    });

    return { message: 'Comment updated' };
  }

  //soft delete
  async deleteComment(id: string, userId: string) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    const now = new Date();
    const createdAt = new Date(comment.createdAt);

    const diffTime = (now.getTime() - createdAt.getTime()) / 60000;
    if (diffTime > 15) throw new ForbiddenException('Delete window expired');

    await this.prisma.comment.update({
      where: { id, userId },
      data: {
        isDeleted: true,
        deletedAt: now,
      },
    });

    return { message: 'Comment deleted successfully' };
  }

  async restoreComment(id: string, userId: string) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!comment || !comment.deletedAt)
      throw new NotFoundException('Comment not deleted');
    const now = new Date();
    const deletedAt = new Date(comment.deletedAt);

    const diffTime = (now.getTime() - deletedAt.getTime()) / 60000;
    if (diffTime > 15) throw new ForbiddenException('Delete window expired');

    await this.prisma.comment.update({
      where: { id, userId },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });

    return { message: 'Comment restored successfully' };
  }
}
