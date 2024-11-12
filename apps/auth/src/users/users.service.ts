import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/register.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<UserDocument> {
    Logger.log(`Creating user: ${user.username}`, 'UsersService');
    try {
      const hashedPassword = await argon.hash(user.password);
      return await this.userModel.create({ ...user, password: hashedPassword });
    } catch (error: any) {
      if (error.code === 11000) {
        const duplicateKey = Object.keys(error.keyPattern)[0];
        Logger.warn(`Duplicate key error on: ${duplicateKey}`, 'UsersService');
        throw new BadRequestException(`A user with this ${duplicateKey} already exists.`);
      } else {
        Logger.error(`Failed to create user: ${user.username}. Error: ${error.message}`, error.stack, 'UsersService');
        throw new InternalServerErrorException(`Failed to create user: ${user.username}. Error: ${error.message}`);
      }
    }
  }
}
