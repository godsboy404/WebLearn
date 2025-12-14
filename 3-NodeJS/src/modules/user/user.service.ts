import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 用户服务类
 * 处理用户相关的业务逻辑和数据操作
 */
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * 创建新用户
   * @param createUserDto 创建用户的数据传输对象
   * @returns 创建的用户对象
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    }).exec();

    if (existingUser) {
      if (existingUser.username === createUserDto.username) {
        throw new ConflictException('用户名已存在');
      }
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('邮箱已存在');
      }
    }

    // 创建新用户
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * 获取所有用户
   * @returns 用户列表
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * 根据ID查找用户
   * @param id 用户ID
   * @returns 用户对象
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    return user;
  }

  /**
   * 根据用户名查找用户
   * @param username 用户名
   * @returns 用户对象
   */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`用户名 ${username} 不存在`);
    }
    return user;
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updateUserDto 更新用户的数据传输对象
   * @returns 更新后的用户对象
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // 检查用户是否存在
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }

    // 如果更新用户名或邮箱，检查是否与其他用户冲突
    if (updateUserDto.username || updateUserDto.email) {
      const conflictUser = await this.userModel.findOne({
        _id: { $ne: id },
        $or: [
          { username: updateUserDto.username },
          { email: updateUserDto.email }
        ]
      }).exec();

      if (conflictUser) {
        if (conflictUser.username === updateUserDto.username) {
          throw new ConflictException('用户名已存在');
        }
        if (conflictUser.email === updateUserDto.email) {
          throw new ConflictException('邮箱已存在');
        }
      }
    }

    // 更新用户信息
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }

    return updatedUser;
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @returns 删除操作结果
   */
  async remove(id: string): Promise<{ deleted: boolean; message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    return { 
      deleted: true, 
      message: `用户 ${result.username} 已成功删除` 
    };
  }

  /**
   * 根据状态查找用户
   * @param status 用户状态
   * @returns 用户列表
   */
  async findByStatus(status: string): Promise<User[]> {
    return this.userModel.find({ status }).exec();
  }

  /**
   * 根据角色查找用户
   * @param role 用户角色
   * @returns 用户列表
   */
  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }
}