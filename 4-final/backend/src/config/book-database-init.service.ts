import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../modules/book/schemas/book.schema';

/**
 * 图书数据库初始化服务
 * 用于初始化数据库中的示例图书数据
 */
@Injectable()
export class BookDatabaseInitService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  /**
   * 初始化图书数据库
   * 创建示例图书数据
   */
  async initDatabase() {
    console.log('开始初始化图书数据库...');

    // 检查是否已有数据
    const bookCount = await this.bookModel.countDocuments().exec();

    if (bookCount > 0) {
      console.log('图书数据库已有数据，跳过初始化');
      return;
    }

    // 创建示例图书
    await this.createSampleBooks();

    console.log('图书数据库初始化完成');
  }

  /**
   * 创建示例图书数据
   */
  private async createSampleBooks() {
    const sampleBooks = [
      {
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        isbn: '978-7-115-27579-0',
        publisher: '人民邮电出版社',
        publishDate: new Date('2012-03-01'),
        category: 'technical',
        tags: ['JavaScript', '前端开发'],
        status: 'read',
        rating: 5,
        notes: '非常经典的JavaScript入门书籍，内容全面详实。',
        startDate: new Date('2022-01-15'),
        finishDate: new Date('2022-03-20'),
        coverImage: 'https://picsum.photos/seed/js-book/200/300.jpg'
      },
      {
        title: '人类简史',
        author: '尤瓦尔·赫拉利',
        isbn: '978-7-5086-4735-7',
        publisher: '中信出版社',
        publishDate: new Date('2014-11-01'),
        category: 'non-fiction',
        tags: ['历史', '人类学'],
        status: 'reading',
        rating: 4,
        notes: '从认知革命、农业革命到科学革命，重新理解人类历史。',
        startDate: new Date('2022-11-01'),
        finishDate: null,
        coverImage: 'https://picsum.photos/seed/sapiens/200/300.jpg'
      },
      {
        title: '三体',
        author: '刘慈欣',
        isbn: '978-7-5366-9293-0',
        publisher: '重庆出版社',
        publishDate: new Date('2008-01-01'),
        category: 'fiction',
        tags: ['科幻', '小说'],
        status: 'unread',
        rating: 0,
        notes: '',
        startDate: null,
        finishDate: null,
        coverImage: 'https://picsum.photos/seed/three-body/200/300.jpg'
      }
    ];

    try {
      await this.bookModel.insertMany(sampleBooks);
      console.log(`成功创建 ${sampleBooks.length} 本示例图书`);
    } catch (error) {
      console.error('创建示例图书失败:', error);
    }
  }
}