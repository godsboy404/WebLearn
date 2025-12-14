import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * 更新产品 DTO
 * 继承自 CreateProductDto，但所有字段都是可选的
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}