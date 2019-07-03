import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const userModel = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: userModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
