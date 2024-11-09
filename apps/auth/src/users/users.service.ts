import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<UserDocument> {
    Logger.log(`Creating user: ${user.username}`, 'UsersService');
    try {
      return await this.userModel.create(user);
    } catch (error: any) {
      if (error.code === 11000) { // MongoDB duplicate key error
        const duplicateKey = Object.keys(error.keyPattern)[0];
        console.log(duplicateKey);
        Logger.warn(`Duplicate key error on: ${duplicateKey}`, 'UsersService');
        throw new ConflictException(`A user with this ${duplicateKey} already exists.`);
      } else {
        Logger.error(`Failed to create user: ${user.username}. Error: ${error.message}`, error.stack, 'UsersService');
        throw new Error(`Failed to create user: ${user.username}. Error: ${error.message}`);
      }
    }
  }
}
