import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength, Min, Max, IsIn } from 'class-validator';

/**
 * 创建用户 DTO
 * 定义创建用户时的数据验证规则
 */
export class CreateUserDto {
  /**
   * 用户名，必填，长度在3-20个字符之间
   */
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名至少需要3个字符' })
  @MaxLength(20, { message: '用户名不能超过20个字符' })
  username: string;

  /**
   * 邮箱地址，必填，必须是有效的邮箱格式
   */
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  /**
   * 密码，必填，长度至少6个字符
   */
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少需要6个字符' })
  password: string;

  /**
   * 年龄，可选，范围在0-150之间
   */
  @IsOptional()
  @Min(0, { message: '年龄不能小于0' })
  @Max(150, { message: '年龄不能大于150' })
  age?: number;

  /**
   * 用户状态，可选，只能是 'active' 或 'inactive'
   */
  @IsOptional()
  @IsIn(['active', 'inactive'], { message: '用户状态只能是 active 或 inactive' })
  status?: string;

  /**
   * 用户角色，可选，只能是 'user' 或 'admin'
   */
  @IsOptional()
  @IsIn(['user', 'admin'], { message: '用户角色只能是 user 或 admin' })
  role?: string;
}