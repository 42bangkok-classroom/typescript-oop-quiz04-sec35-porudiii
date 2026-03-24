import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string | string[],
  ) {
    let fieldArray: string[] | undefined;

    if (typeof fields === 'string') {
      fieldArray = fields.split(',');
    } else if (Array.isArray(fields)) {
      fieldArray = fields;
    }

    return this.userService.findOne(id, fieldArray);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
