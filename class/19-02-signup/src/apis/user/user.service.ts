import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ email, password, name, age }) {
    //================ section : need to do ==========
    // Delete duplecate email user,
    // Use find, and ConflictException

    //================================================
    return await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
