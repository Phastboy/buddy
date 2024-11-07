import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async create(user: CreateUserDto): Promise<User> {
        try {
          return await this.userModel.create(user);
        } catch (error: any) {
          if (error.code === 11000) {
            throw new Error('Username or Email already exists');
          }
        }
      }      
}