import { IsString, IsNumber, IsOptional, IsEnum, IsArray, Min, Max, MaxLength, MinLength } from 'class-validator';

/**
 * 创建产品 DTO
 * 定义创建产品时的数据验证规则
 */
export class CreateProductDto {
  /**
   * 产品名称，必填，长度在1-100个字符之间
   */
  @IsString({ message: '产品名称必须是字符串' })
  @MinLength(1, { message: '产品名称不能为空' })
  @MaxLength(100, { message: '产品名称不能超过100个字符' })
  name: string;

  /**
   * 产品描述，可选，最多500个字符
   */
  @IsOptional()
  @IsString({ message: '产品描述必须是字符串' })
  @MaxLength(500, { message: '产品描述不能超过500个字符' })
  description?: string;

  /**
   * 产品价格，必填，大于等于0
   */
  @IsNumber({}, { message: '价格必须是数字' })
  @Min(0, { message: '价格不能小于0' })
  price: number;

  /**
   * 产品库存数量，必填，大于等于0
   */
  @IsNumber({}, { message: '库存数量必须是数字' })
  @Min(0, { message: '库存数量不能小于0' })
  stock: number;

  /**
   * 产品分类，必填，只能是预定义的分类之一
   */
  @IsEnum(['electronics', 'clothing', 'food', 'books', 'other'], { 
    message: '产品分类只能是 electronics, clothing, food, books 或 other' 
  })
  category: string;

  /**
   * 产品图片URL，可选
   */
  @IsOptional()
  @IsString({ message: '图片URL必须是字符串' })
  imageUrl?: string;

  /**
   * 产品标签，可选，字符串数组
   */
  @IsOptional()
  @IsArray({ message: '标签必须是数组' })
  @IsString({ each: true, message: '每个标签必须是字符串' })
  tags?: string[];

  /**
   * 产品状态，可选，只能是预定义的状态之一
   */
  @IsOptional()
  @IsEnum(['available', 'unavailable', 'discontinued'], { 
    message: '产品状态只能是 available, unavailable 或 discontinued' 
  })
  status?: string;

  /**
   * 产品评分，可选，范围在0-5之间
   */
  @IsOptional()
  @IsNumber({}, { message: '评分必须是数字' })
  @Min(0, { message: '评分不能小于0' })
  @Max(5, { message: '评分不能大于5' })
  rating?: number;

  /**
   * 产品销售数量，可选，大于等于0
   */
  @IsOptional()
  @IsNumber({}, { message: '销售数量必须是数字' })
  @Min(0, { message: '销售数量不能小于0' })
  salesCount?: number;
}