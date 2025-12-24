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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

/**
 * 图书控制器
 * 处理图书相关的HTTP请求和响应
 */
@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * 创建新图书
   * @param createBookDto 创建图书的数据传输对象
   * @returns 创建的图书对象
   */
  @Post()
  @ApiOperation({ summary: '创建新图书' })
  @ApiResponse({ status: 201, description: '图书创建成功' })
  @ApiResponse({ status: 400, description: '请求数据无效' })
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  /**
   * 获取所有图书列表
   * @returns 图书列表
   */
  @Get()
  @ApiOperation({ summary: '获取所有图书列表' })
  @ApiResponse({ status: 200, description: '成功获取图书列表' })
  async findAll() {
    return this.bookService.findAll();
  }

  /**
   * 根据ID获取特定图书
   * @param id 图书ID
   * @returns 图书对象
   */
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取图书' })
  @ApiParam({ name: 'id', description: '图书ID' })
  @ApiResponse({ status: 200, description: '成功获取图书信息' })
  @ApiResponse({ status: 404, description: '图书不存在' })
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  /**
   * 搜索图书
   * @param query 搜索关键词
   * @returns 搜索结果
   */
  @Get('search/:query')
  @ApiOperation({ summary: '搜索图书' })
  @ApiParam({ name: 'query', description: '搜索关键词' })
  @ApiResponse({ status: 200, description: '成功获取搜索结果' })
  async search(@Param('query') query: string) {
    return this.bookService.search(query);
  }

  /**
   * 根据分类获取图书列表
   * @param category 图书分类
   * @returns 图书列表
   */
  @Get('category/:category')
  @ApiOperation({ summary: '根据分类获取图书列表' })
  @ApiParam({ name: 'category', description: '图书分类 (fiction/non-fiction/technical/biography)' })
  @ApiResponse({ status: 200, description: '成功获取图书列表' })
  async findByCategory(@Param('category') category: string) {
    return this.bookService.findByCategory(category);
  }

  /**
   * 根据阅读状态获取图书列表
   * @param status 阅读状态
   * @returns 图书列表
   */
  @Get('status/:status')
  @ApiOperation({ summary: '根据阅读状态获取图书列表' })
  @ApiParam({ name: 'status', description: '阅读状态 (unread/reading/read)' })
  @ApiResponse({ status: 200, description: '成功获取图书列表' })
  async findByStatus(@Param('status') status: string) {
    return this.bookService.findByStatus(status);
  }

  /**
   * 根据评分范围获取图书列表
   * @param minRating 最低评分
   * @param maxRating 最高评分
   * @returns 图书列表
   */
  @Get('rating-range')
  @ApiOperation({ summary: '根据评分范围获取图书列表' })
  @ApiQuery({ name: 'minRating', description: '最低评分' })
  @ApiQuery({ name: 'maxRating', description: '最高评分' })
  @ApiResponse({ status: 200, description: '成功获取图书列表' })
  async findByRatingRange(
    @Query('minRating', ParseIntPipe) minRating: number,
    @Query('maxRating', ParseIntPipe) maxRating: number
  ) {
    return this.bookService.findByRatingRange(minRating, maxRating);
  }

  /**
   * 获取已读图书列表
   * @returns 已读图书列表
   */
  @Get('read/list')
  @ApiOperation({ summary: '获取已读图书列表' })
  @ApiResponse({ status: 200, description: '成功获取已读图书列表' })
  async findReadBooks() {
    return this.bookService.findReadBooks();
  }

  /**
   * 获取正在阅读的图书列表
   * @returns 正在阅读的图书列表
   */
  @Get('reading/list')
  @ApiOperation({ summary: '获取正在阅读的图书列表' })
  @ApiResponse({ status: 200, description: '成功获取正在阅读的图书列表' })
  async findReadingBooks() {
    return this.bookService.findReadingBooks();
  }

  /**
   * 获取未读图书列表
   * @returns 未读图书列表
   */
  @Get('unread/list')
  @ApiOperation({ summary: '获取未读图书列表' })
  @ApiResponse({ status: 200, description: '成功获取未读图书列表' })
  async findUnreadBooks() {
    return this.bookService.findUnreadBooks();
  }

  /**
   * 获取统计信息
   * @returns 统计信息
   */
  @Get('statistics/summary')
  @ApiOperation({ summary: '获取图书统计信息' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  async getStatistics() {
    return this.bookService.getStatistics();
  }

  /**
   * 更新图书信息
   * @param id 图书ID
   * @param updateBookDto 更新图书的数据传输对象
   * @returns 更新后的图书对象
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新图书信息' })
  @ApiParam({ name: 'id', description: '图书ID' })
  @ApiResponse({ status: 200, description: '图书信息更新成功' })
  @ApiResponse({ status: 404, description: '图书不存在' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  /**
   * 删除图书
   * @param id 图书ID
   * @returns 删除操作结果
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除图书' })
  @ApiParam({ name: 'id', description: '图书ID' })
  @ApiResponse({ status: 200, description: '图书删除成功' })
  @ApiResponse({ status: 404, description: '图书不存在' })
  async remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}