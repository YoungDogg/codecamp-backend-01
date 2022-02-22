import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({ email, password, name, age });
  }

  async update({ email, name, age, point }) {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnprocessableEntityException('등록된 유저가 아닙니다');
    if (!name) name = user.name;
    if (!age) age = user.age;
    if (!point) point = user.point;

    console.log(name);

    return await this.userRepository.update({ email }, { name, age, point });
  }
}
