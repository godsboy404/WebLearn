import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

/**
 * 图书服务
 * 处理图书相关的业务逻辑
 */
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  /**
   * 创建新图书
   * @param createBookDto 创建图书的数据传输对象
   * @returns 创建的图书对象
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // 验证日期逻辑
    if (createBookDto.startDate && createBookDto.finishDate) {
      const startDate = new Date(createBookDto.startDate);
      const finishDate = new Date(createBookDto.finishDate);
      
      if (startDate > finishDate) {
        throw new BadRequestException('开始阅读日期不能晚于完成阅读日期');
      }
    }

    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  /**
   * 获取所有图书列表
   * @returns 图书列表
   */
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().sort({ createdAt: -1 }).exec();
  }

  /**
   * 根据ID获取特定图书
   * @param id 图书ID
   * @returns 图书对象
   */
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`图书ID ${id} 不存在`);
    }
    return book;
  }

  /**
   * 搜索图书
   * @param query 搜索关键词
   * @returns 搜索结果
   */
  async search(query: string): Promise<Book[]> {
    // 转义正则表达式特殊字符，防止正则表达式错误
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'i'); // 不区分大小写的正则表达式
    return this.bookModel.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    }).sort({ createdAt: -1 }).exec();
  }

  /**
   * 根据分类获取图书列表
   * @param category 图书分类
   * @returns 图书列表
   */
  async findByCategory(category: string): Promise<Book[]> {
    return this.bookModel.find({ category }).sort({ createdAt: -1 }).exec();
  }

  /**
   * 根据阅读状态获取图书列表
   * @param status 阅读状态
   * @returns 图书列表
   */
  async findByStatus(status: string): Promise<Book[]> {
    return this.bookModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  /**
   * 根据评分获取图书列表
   * @param minRating 最低评分
   * @param maxRating 最高评分
   * @returns 图书列表
   */
  async findByRatingRange(minRating: number, maxRating: number): Promise<Book[]> {
    return this.bookModel.find({
      rating: { $gte: minRating, $lte: maxRating }
    }).sort({ rating: -1, createdAt: -1 }).exec();
  }

  /**
   * 获取已读图书列表
   * @returns 已读图书列表
   */
  async findReadBooks(): Promise<Book[]> {
    return this.bookModel.find({ status: 'read' }).sort({ finishDate: -1 }).exec();
  }

  /**
   * 获取正在阅读的图书列表
   * @returns 正在阅读的图书列表
   */
  async findReadingBooks(): Promise<Book[]> {
    return this.bookModel.find({ status: 'reading' }).sort({ startDate: -1 }).exec();
  }

  /**
   * 获取未读图书列表
   * @returns 未读图书列表
   */
  async findUnreadBooks(): Promise<Book[]> {
    return this.bookModel.find({ status: 'unread' }).sort({ createdAt: -1 }).exec();
  }

  /**
   * 更新图书信息
   * @param id 图书ID
   * @param updateBookDto 更新图书的数据传输对象
   * @returns 更新后的图书对象
   */
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    // 验证日期逻辑
    if (updateBookDto.startDate && updateBookDto.finishDate) {
      const startDate = new Date(updateBookDto.startDate);
      const finishDate = new Date(updateBookDto.finishDate);
      
      if (startDate > finishDate) {
        throw new BadRequestException('开始阅读日期不能晚于完成阅读日期');
      }
    }

    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
      
    if (!updatedBook) {
      throw new NotFoundException(`图书ID ${id} 不存在`);
    }
    
    return updatedBook;
  }

  /**
   * 删除图书
   * @param id 图书ID
   * @returns 删除操作结果
   */
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`图书ID ${id} 不存在`);
    }
    return { message: '图书删除成功' };
  }

  /**
   * 获取统计信息
   * @returns 统计信息
   */
  async getStatistics(): Promise<{
    total: number;
    read: number;
    reading: number;
    unread: number;
    averageRating: number;
  }> {
    const total = await this.bookModel.countDocuments().exec();
    const read = await this.bookModel.countDocuments({ status: 'read' }).exec();
    const reading = await this.bookModel.countDocuments({ status: 'reading' }).exec();
    const unread = await this.bookModel.countDocuments({ status: 'unread' }).exec();
    
    // 计算平均评分（只计算有评分的图书）
    const ratedBooks = await this.bookModel.find({ rating: { $gt: 0 } }).exec();
    const averageRating = ratedBooks.length > 0
      ? ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length
      : 0;
    
    return {
      total,
      read,
      reading,
      unread,
      averageRating: Math.round(averageRating * 10) / 10 // 保留一位小数
    };
  }
}