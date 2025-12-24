import { IsString, IsOptional, IsEnum, IsArray, IsNumber, Min, Max, MaxLength, MinLength, IsDateString } from 'class-validator';

/**
 * 创建图书 DTO
 * 定义创建图书时的数据验证规则
 */
export class CreateBookDto {
  /**
   * 图书标题，必填，长度在1-200个字符之间
   */
  @IsString({ message: '图书标题必须是字符串' })
  @MinLength(1, { message: '图书标题不能为空' })
  @MaxLength(200, { message: '图书标题不能超过200个字符' })
  title: string;

  /**
   * 图书作者，必填，长度在1-100个字符之间
   */
  @IsString({ message: '图书作者必须是字符串' })
  @MinLength(1, { message: '图书作者不能为空' })
  @MaxLength(100, { message: '图书作者不能超过100个字符' })
  author: string;

  /**
   * ISBN号码，可选
   */
  @IsOptional()
  @IsString({ message: 'ISBN号码必须是字符串' })
  @MaxLength(20, { message: 'ISBN号码不能超过20个字符' })
  isbn?: string;

  /**
   * 出版社，可选，最多100个字符
   */
  @IsOptional()
  @IsString({ message: '出版社必须是字符串' })
  @MaxLength(100, { message: '出版社不能超过100个字符' })
  publisher?: string;

  /**
   * 出版日期，可选
   */
  @IsOptional()
  @IsDateString({}, { message: '出版日期格式无效' })
  publishDate?: string;

  /**
   * 图书分类，可选，只能是预定义的分类之一
   */
  @IsOptional()
  @IsEnum(['fiction', 'non-fiction', 'technical', 'biography'], { 
    message: '图书分类只能是 fiction, non-fiction, technical 或 biography' 
  })
  category?: string;

  /**
   * 图书标签，可选，字符串数组
   */
  @IsOptional()
  @IsArray({ message: '标签必须是数组' })
  @IsString({ each: true, message: '每个标签必须是字符串' })
  tags?: string[];

  /**
   * 阅读状态，可选，只能是预定义的状态之一
   */
  @IsOptional()
  @IsEnum(['unread', 'reading', 'read'], { 
    message: '阅读状态只能是 unread, reading 或 read' 
  })
  status?: string;

  /**
   * 个人评分，可选，范围在0-5之间
   */
  @IsOptional()
  @IsNumber({}, { message: '评分必须是数字' })
  @Min(0, { message: '评分不能小于0' })
  @Max(5, { message: '评分不能大于5' })
  rating?: number;

  /**
   * 个人笔记，可选，最多1000个字符
   */
  @IsOptional()
  @IsString({ message: '个人笔记必须是字符串' })
  @MaxLength(1000, { message: '个人笔记不能超过1000个字符' })
  notes?: string;

  /**
   * 开始阅读日期，可选
   */
  @IsOptional()
  @IsDateString({}, { message: '开始阅读日期格式无效' })
  startDate?: string;

  /**
   * 完成阅读日期，可选
   */
  @IsOptional()
  @IsDateString({}, { message: '完成阅读日期格式无效' })
  finishDate?: string;

  /**
   * 封面图片URL，可选
   */
  @IsOptional()
  @IsString({ message: '封面图片URL必须是字符串' })
  @MaxLength(500, { message: '封面图片URL不能超过500个字符' })
  coverImage?: string;
}