import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { UserDocument } from './users.schema';
import { CreateUserDto } from './dto/register.dto';
import { Logger } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(() => {
    userModel = {
      create: jest.fn(),
    } as any;
    usersService = new UsersService(userModel);
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'warn').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const createdUser = { _id: '1', username: 'testuser' } as unknown as UserDocument;
    (userModel.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await usersService.create(userDto);

    expect(result).toEqual({ success: true, data: createdUser });
    expect(userModel.create).toHaveBeenCalledWith(userDto);
    expect(Logger.log).toHaveBeenCalledWith('Creating user: testuser', 'UsersService');
  });

  it('should return an error for duplicate key', async () => {
    const userDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const error = { code: 11000, keyPattern: { username: 1 } };
    (userModel.create as jest.Mock).mockRejectedValue(error);

    const result = await usersService.create(userDto);

    expect(result).toEqual({ success: false, message: 'A user with this username already exists.' });
    expect(Logger.warn).toHaveBeenCalledWith('Duplicate key error on: username', 'UsersService');
  });

  it('should return a general error', async () => {
    const userDto: CreateUserDto = { username: 'testuser', email: 'testuser@example.com', password: 'testpass' };
    const error = new Error('Some error');
    (userModel.create as jest.Mock).mockRejectedValue(error);

    const result = await usersService.create(userDto);

    expect(result).toEqual({ success: false, message: `Failed to create user: ${userDto.username}. Error: ${error.message}` });
    expect(Logger.error).toHaveBeenCalledWith(
      `Failed to create user: ${userDto.username}. Error: ${error.message}`,
      error.stack,
      'UsersService',
    );
  });
});