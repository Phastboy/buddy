import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    user: CreateUserDto,
  ): Promise<{ success: boolean; data?: UserDocument; message?: string }> {
    Logger.log(`Creating user: ${user.username}`, 'UsersService');
    try {
      const createdUser = await this.userModel.create(user);
      return {
        success: true,
        data: createdUser,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        const duplicateKey = Object.keys(error.keyPattern)[0];
        Logger.warn(`Duplicate key error on: ${duplicateKey}`, 'UsersService');
        return {
          success: false,
          message: `A user with this ${duplicateKey} already exists.`,
        };
      } else {
        Logger.error(
          `Failed to create user: ${user.username}. Error: ${error.message}`,
          error.stack,
          'UsersService',
        );
        return {
          success: false,
          message: `Failed to create user: ${user.username}. Error: ${error.message}`,
        };
      }
    }
  }
}
