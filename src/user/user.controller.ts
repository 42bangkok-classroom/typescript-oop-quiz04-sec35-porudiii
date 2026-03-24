import { Controller, Get } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getHello(): IUser[] {
    return this.userService.test();
  }

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }
}
