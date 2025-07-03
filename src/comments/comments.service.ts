import { Injectable, NotFoundException } from '@nestjs/common';
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
}
