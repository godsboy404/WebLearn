import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 产品文档类型
 */
export type ProductDocument = Product & Document;

/**
 * 产品实体类
 * 定义产品数据模型和数据库字段
 */
@Schema({ timestamps: true }) // 自动添加 createdAt 和 updatedAt 字段
export class Product {
  /**
   * 产品名称
   */
  @Prop({ required: true, trim: true })
  name: string;

  /**
   * 产品描述
   */
  @Prop({ trim: true })
  description?: string;

  /**
   * 产品价格
   */
  @Prop({ required: true, min: 0 })
  price: number;

  /**
   * 产品库存数量
   */
  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  /**
   * 产品分类
   */
  @Prop({ required: true, enum: ['electronics', 'clothing', 'food', 'books', 'other'] })
  category: string;

  /**
   * 产品图片URL
   */
  @Prop()
  imageUrl?: string;

  /**
   * 产品标签
   */
  @Prop([String])
  tags?: string[];

  /**
   * 产品状态：available-可用，unavailable-不可用，discontinued-已停产
   */
  @Prop({ enum: ['available', 'unavailable', 'discontinued'], default: 'available' })
  status: string;

  /**
   * 产品评分（0-5分）
   */
  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;

  /**
   * 产品销售数量
   */
  @Prop({ min: 0, default: 0 })
  salesCount: number;
}

/**
 * 创建产品 Schema
 */
export const ProductSchema = SchemaFactory.createForClass(Product);