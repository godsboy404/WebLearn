import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/user/schemas/user.schema';
import { Product, ProductDocument } from '../modules/product/schemas/product.schema';

/**
 * 数据库初始化服务
 * 用于初始化数据库中的示例数据
 */
@Injectable()
export class DatabaseInitService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  /**
   * 初始化数据库
   * 创建示例用户和产品数据
   */
  async initDatabase() {
    console.log('开始初始化数据库...');

    // 检查是否已有数据
    const userCount = await this.userModel.countDocuments().exec();
    const productCount = await this.productModel.countDocuments().exec();

    if (userCount > 0 && productCount > 0) {
      console.log('数据库已有数据，跳过初始化');
      return;
    }

    // 创建示例用户
    if (userCount === 0) {
      await this.createSampleUsers();
    }

    // 创建示例产品
    if (productCount === 0) {
      await this.createSampleProducts();
    }

    console.log('数据库初始化完成');
  }

  /**
   * 创建示例用户数据
   */
  private async createSampleUsers() {
    const sampleUsers = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123456',
        age: 30,
        status: 'active',
        role: 'admin'
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'john123456',
        age: 25,
        status: 'active',
        role: 'user'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'jane123456',
        age: 28,
        status: 'active',
        role: 'user'
      },
      {
        username: 'bob_wilson',
        email: 'bob@example.com',
        password: 'bob123456',
        age: 35,
        status: 'inactive',
        role: 'user'
      }
    ];

    try {
      await this.userModel.insertMany(sampleUsers);
      console.log(`成功创建 ${sampleUsers.length} 个示例用户`);
    } catch (error) {
      console.error('创建示例用户失败:', error);
    }
  }

  /**
   * 创建示例产品数据
   */
  private async createSampleProducts() {
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro',
        description: '苹果最新款智能手机，配备A17 Pro芯片',
        price: 7999,
        stock: 50,
        category: 'electronics',
        imageUrl: 'https://example.com/iphone15.jpg',
        tags: ['手机', '苹果', '5G'],
        status: 'available',
        rating: 4.8,
        salesCount: 120
      },
      {
        name: 'MacBook Pro 14寸',
        description: '苹果专业级笔记本电脑，M3 Pro芯片',
        price: 14999,
        stock: 20,
        category: 'electronics',
        imageUrl: 'https://example.com/macbook.jpg',
        tags: ['笔记本', '苹果', 'M3'],
        status: 'available',
        rating: 4.7,
        salesCount: 85
      },
      {
        name: '运动T恤',
        description: '透气速干运动T恤，适合各种运动场合',
        price: 99,
        stock: 100,
        category: 'clothing',
        imageUrl: 'https://example.com/sports-shirt.jpg',
        tags: ['服装', '运动', '透气'],
        status: 'available',
        rating: 4.2,
        salesCount: 200
      },
      {
        name: 'JavaScript高级程序设计',
        description: '前端开发必读经典书籍',
        price: 129,
        stock: 30,
        category: 'books',
        imageUrl: 'https://example.com/js-book.jpg',
        tags: ['书籍', '编程', 'JavaScript'],
        status: 'available',
        rating: 4.9,
        salesCount: 150
      },
      {
        name: '有机苹果',
        description: '新鲜有机苹果，营养丰富',
        price: 15.9,
        stock: 200,
        category: 'food',
        imageUrl: 'https://example.com/organic-apple.jpg',
        tags: ['水果', '有机', '健康'],
        status: 'available',
        rating: 4.5,
        salesCount: 500
      }
    ];

    try {
      await this.productModel.insertMany(sampleProducts);
      console.log(`成功创建 ${sampleProducts.length} 个示例产品`);
    } catch (error) {
      console.error('创建示例产品失败:', error);
    }
  }
}