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
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 用户控制器
 * 处理用户相关的HTTP请求和响应
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建新用户
   * @param createUserDto 创建用户的数据传输对象
   * @returns 创建的用户对象
   */
  @Post()
  @ApiOperation({ summary: '创建新用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  @ApiResponse({ status: 400, description: '请求数据无效' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 获取所有用户列表
   * @returns 用户列表
   */
  @Get()
  @ApiOperation({ summary: '获取所有用户列表' })
  @ApiResponse({ status: 200, description: '成功获取用户列表' })
  async findAll() {
    return this.userService.findAll();
  }

  /**
   * 根据ID获取特定用户
   * @param id 用户ID
   * @returns 用户对象
   */
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取用户信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * 根据用户名获取用户
   * @param username 用户名
   * @returns 用户对象
   */
  @Get('username/:username')
  @ApiOperation({ summary: '根据用户名获取用户' })
  @ApiParam({ name: 'username', description: '用户名' })
  @ApiResponse({ status: 200, description: '成功获取用户信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  /**
   * 根据状态获取用户列表
   * @param status 用户状态
   * @returns 用户列表
   */
  @Get('status/:status')
  @ApiOperation({ summary: '根据状态获取用户列表' })
  @ApiParam({ name: 'status', description: '用户状态 (active/inactive)' })
  @ApiResponse({ status: 200, description: '成功获取用户列表' })
  async findByStatus(@Param('status') status: string) {
    return this.userService.findByStatus(status);
  }

  /**
   * 根据角色获取用户列表
   * @param role 用户角色
   * @returns 用户列表
   */
  @Get('role/:role')
  @ApiOperation({ summary: '根据角色获取用户列表' })
  @ApiParam({ name: 'role', description: '用户角色 (user/admin)' })
  @ApiResponse({ status: 200, description: '成功获取用户列表' })
  async findByRole(@Param('role') role: string) {
    return this.userService.findByRole(role);
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updateUserDto 更新用户的数据传输对象
   * @returns 更新后的用户对象
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @returns 删除操作结果
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}