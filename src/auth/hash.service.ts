import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class HashService {
  constructor() {}

  async hashText(text: string) {
    return bcrypt.hash(text, saltRounds);
  }

  async compare(text: string, hash: string) {
    return bcrypt.compare(text, hash);
  }
}
