import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * 更新用户 DTO
 * 继承自 CreateUserDto，但所有字段都是可选的
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}