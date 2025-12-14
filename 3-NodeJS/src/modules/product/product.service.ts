import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

/**
 * 产品服务类
 * 处理产品相关的业务逻辑和数据操作
 */
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  /**
   * 创建新产品
   * @param createProductDto 创建产品的数据传输对象
   * @returns 创建的产品对象
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // 创建新产品
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  /**
   * 获取所有产品
   * @returns 产品列表
   */
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  /**
   * 根据ID查找产品
   * @param id 产品ID
   * @returns 产品对象
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }
    return product;
  }

  /**
   * 根据名称查找产品
   * @param name 产品名称
   * @returns 产品对象
   */
  async findByName(name: string): Promise<Product[]> {
    // 使用正则表达式进行模糊搜索
    return this.productModel.find({ 
      name: { $regex: name, $options: 'i' } 
    }).exec();
  }

  /**
   * 根据分类查找产品
   * @param category 产品分类
   * @returns 产品列表
   */
  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  /**
   * 根据状态查找产品
   * @param status 产品状态
   * @returns 产品列表
   */
  async findByStatus(status: string): Promise<Product[]> {
    return this.productModel.find({ status }).exec();
  }

  /**
   * 查找指定价格范围内的产品
   * @param minPrice 最低价格
   * @param maxPrice 最高价格
   * @returns 产品列表
   */
  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.productModel.find({ 
      price: { $gte: minPrice, $lte: maxPrice } 
    }).exec();
  }

  /**
   * 更新产品信息
   * @param id 产品ID
   * @param updateProductDto 更新产品的数据传输对象
   * @returns 更新后的产品对象
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // 检查产品是否存在
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }

    // 更新产品信息
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }

    return updatedProduct;
  }

  /**
   * 删除产品
   * @param id 产品ID
   * @returns 删除操作结果
   */
  async remove(id: string): Promise<{ deleted: boolean; message: string }> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }
    return { 
      deleted: true, 
      message: `产品 ${result.name} 已成功删除` 
    };
  }

  /**
   * 增加产品库存
   * @param id 产品ID
   * @param quantity 增加的数量
   * @returns 更新后的产品对象
   */
  async increaseStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }

    if (quantity <= 0) {
      throw new ConflictException('增加的数量必须大于0');
    }

    return this.productModel
      .findByIdAndUpdate(id, { $inc: { stock: quantity } }, { new: true })
      .exec();
  }

  /**
   * 减少产品库存
   * @param id 产品ID
   * @param quantity 减少的数量
   * @returns 更新后的产品对象
   */
  async decreaseStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`产品ID ${id} 不存在`);
    }

    if (quantity <= 0) {
      throw new ConflictException('减少的数量必须大于0');
    }

    if (product.stock < quantity) {
      throw new ConflictException('库存不足');
    }

    return this.productModel
      .findByIdAndUpdate(id, { $inc: { stock: -quantity, salesCount: quantity } }, { new: true })
      .exec();
  }

  /**
   * 获取低库存产品（库存小于10的产品）
   * @returns 产品列表
   */
  async findLowStockProducts(): Promise<Product[]> {
    return this.productModel.find({ stock: { $lt: 10 } }).exec();
  }

  /**
   * 获取热门产品（按销售数量排序）
   * @param limit 返回的产品数量限制
   * @returns 产品列表
   */
  async findPopularProducts(limit: number = 10): Promise<Product[]> {
    return this.productModel
      .find()
      .sort({ salesCount: -1 })
      .limit(limit)
      .exec();
  }
}