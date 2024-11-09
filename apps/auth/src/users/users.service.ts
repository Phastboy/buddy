import { Injectable, Logger } from '@nestjs/common';
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
          if (error) {
            Logger.error(`Failed to create user: ${user.username}. Error: ${error.message}`, error.stack, 'UsersService');
            throw new Error(`Failed to create user: ${user.username}. Error: ${error.message}`);
          }
        }
      }      
}