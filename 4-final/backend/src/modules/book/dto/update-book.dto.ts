import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

/**
 * 更新图书 DTO
 * 继承自 CreateBookDto，但所有字段都是可选的
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}