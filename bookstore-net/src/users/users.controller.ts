import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.addUser(createUserDTO);

    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      user,
    });
  }

  @Get()
  async getAllUsers(@Res() res) {
    const users = await this.usersService.getAllUsers();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.usersService.getUser(userID);

    if(!user) {
      throw new NotFoundException('User doesnt not exist!');
    }

    return res.status(HttpStatus.OK).json(user)
  }
}