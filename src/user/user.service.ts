import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private filePath = path.join(process.cwd(), 'data', 'users.json');

  test(): IUser[] {
    return [];
  }

  findAll(): IUser[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as IUser[];
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === +id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    if (fields === undefined) {
      return user;
    }
    if (fields.length === 0) {
      return {};
    }

    const result: Partial<IUser> = {};

    fields.forEach((field) => {
      if (field in user) {
        result[field as keyof IUser] = field[field as keyof IUser];
      }
    });

    return result;
  }
}
