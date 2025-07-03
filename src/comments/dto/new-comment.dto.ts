import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NewCommentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  //if 1st comment then no parentId
  @IsOptional()
  @IsString()
  parentId: string;
}
