import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 用户文档类型
 */
export type UserDocument = User & Document;

/**
 * 用户实体类
 * 定义用户数据模型和数据库字段
 */
@Schema({ timestamps: true }) // 自动添加 createdAt 和 updatedAt 字段
export class User {
  /**
   * 用户名
   */
  @Prop({ required: true, unique: true, trim: true })
  username: string;

  /**
   * 邮箱地址
   */
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  /**
   * 密码（实际应用中应该加密存储）
   */
  @Prop({ required: true, minlength: 6 })
  password: string;

  /**
   * 年龄
   */
  @Prop({ min: 0, max: 150 })
  age?: number;

  /**
   * 用户状态：active-活跃，inactive-非活跃
   */
  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  /**
   * 用户角色：user-普通用户，admin-管理员
   */
  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;
}

/**
 * 创建用户 Schema
 */
export const UserSchema = SchemaFactory.createForClass(User);