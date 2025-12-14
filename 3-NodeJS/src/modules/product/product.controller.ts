import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

/**
 * 产品控制器
 * 处理产品相关的HTTP请求和响应
 */
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * 创建新产品
   * @param createProductDto 创建产品的数据传输对象
   * @returns 创建的产品对象
   */
  @Post()
  @ApiOperation({ summary: '创建新产品' })
  @ApiResponse({ status: 201, description: '产品创建成功' })
  @ApiResponse({ status: 400, description: '请求数据无效' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  /**
   * 获取所有产品列表
   * @returns 产品列表
   */
  @Get()
  @ApiOperation({ summary: '获取所有产品列表' })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  async findAll() {
    return this.productService.findAll();
  }

  /**
   * 根据ID获取特定产品
   * @param id 产品ID
   * @returns 产品对象
   */
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取产品' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '成功获取产品信息' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  /**
   * 根据名称搜索产品
   * @param name 产品名称
   * @returns 产品列表
   */
  @Get('search/:name')
  @ApiOperation({ summary: '根据名称搜索产品' })
  @ApiParam({ name: 'name', description: '产品名称' })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  async findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  /**
   * 根据分类获取产品列表
   * @param category 产品分类
   * @returns 产品列表
   */
  @Get('category/:category')
  @ApiOperation({ summary: '根据分类获取产品列表' })
  @ApiParam({ name: 'category', description: '产品分类 (electronics/clothing/food/books/other)' })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  async findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  /**
   * 根据状态获取产品列表
   * @param status 产品状态
   * @returns 产品列表
   */
  @Get('status/:status')
  @ApiOperation({ summary: '根据状态获取产品列表' })
  @ApiParam({ name: 'status', description: '产品状态 (available/unavailable/discontinued)' })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  async findByStatus(@Param('status') status: string) {
    return this.productService.findByStatus(status);
  }

  /**
   * 根据价格范围获取产品列表
   * @param minPrice 最低价格
   * @param maxPrice 最高价格
   * @returns 产品列表
   */
  @Get('price-range')
  @ApiOperation({ summary: '根据价格范围获取产品列表' })
  @ApiQuery({ name: 'minPrice', description: '最低价格' })
  @ApiQuery({ name: 'maxPrice', description: '最高价格' })
  @ApiResponse({ status: 200, description: '成功获取产品列表' })
  async findByPriceRange(
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number
  ) {
    return this.productService.findByPriceRange(minPrice, maxPrice);
  }

  /**
   * 获取低库存产品
   * @returns 产品列表
   */
  @Get('low-stock/list')
  @ApiOperation({ summary: '获取低库存产品（库存小于10）' })
  @ApiResponse({ status: 200, description: '成功获取低库存产品列表' })
  async findLowStockProducts() {
    return this.productService.findLowStockProducts();
  }

  /**
   * 获取热门产品
   * @param limit 返回的产品数量限制
   * @returns 产品列表
   */
  @Get('popular/list')
  @ApiOperation({ summary: '获取热门产品（按销售数量排序）' })
  @ApiQuery({ name: 'limit', required: false, description: '返回的产品数量限制' })
  @ApiResponse({ status: 200, description: '成功获取热门产品列表' })
  async findPopularProducts(@Query('limit', ParseIntPipe) limit: number = 10) {
    return this.productService.findPopularProducts(limit);
  }

  /**
   * 更新产品信息
   * @param id 产品ID
   * @param updateProductDto 更新产品的数据传输对象
   * @returns 更新后的产品对象
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新产品信息' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '产品信息更新成功' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * 增加产品库存
   * @param id 产品ID
   * @param quantity 增加的数量
   * @returns 更新后的产品对象
   */
  @Patch(':id/increase-stock')
  @ApiOperation({ summary: '增加产品库存' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiQuery({ name: 'quantity', description: '增加的数量' })
  @ApiResponse({ status: 200, description: '库存增加成功' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  @ApiResponse({ status: 409, description: '增加的数量必须大于0' })
  async increaseStock(
    @Param('id') id: string,
    @Query('quantity', ParseIntPipe) quantity: number
  ) {
    return this.productService.increaseStock(id, quantity);
  }

  /**
   * 减少产品库存
   * @param id 产品ID
   * @param quantity 减少的数量
   * @returns 更新后的产品对象
   */
  @Patch(':id/decrease-stock')
  @ApiOperation({ summary: '减少产品库存' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiQuery({ name: 'quantity', description: '减少的数量' })
  @ApiResponse({ status: 200, description: '库存减少成功' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  @ApiResponse({ status: 409, description: '库存不足或减少的数量无效' })
  async decreaseStock(
    @Param('id') id: string,
    @Query('quantity', ParseIntPipe) quantity: number
  ) {
    return this.productService.decreaseStock(id, quantity);
  }

  /**
   * 删除产品
   * @param id 产品ID
   * @returns 删除操作结果
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除产品' })
  @ApiParam({ name: 'id', description: '产品ID' })
  @ApiResponse({ status: 200, description: '产品删除成功' })
  @ApiResponse({ status: 404, description: '产品不存在' })
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}