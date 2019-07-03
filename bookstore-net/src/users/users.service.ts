import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interfaces';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly usersModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersModel.find().exec();

    return users;
  }

  async getUser(userID): Promise<User> {
    const user = await this.usersModel.findById(userID).exec();

    return user;
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.usersModel(createUserDTO);

    return newUser.save();
  }

  async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true },
    );

    return updatedUser;
  }

  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.usersModel.findByIdAndRemove(userID);

    return deletedUser;
  }
}
