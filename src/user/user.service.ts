import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private filePath = path.join(process.cwd(), 'data', 'user.json');

  test(): IUser[] {
    return [];
  }

  findAll(): IUser[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as IUser[];
  }
}
