import {
  ConflictException,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createProduct.input';
import { UpdateUserInput } from './dto/updateProduct.input';
import { User } from './entities/user.entity';

interface IFindOne {
  userId: string;
}

interface ICreate {
  createUserInput: CreateUserInput;
}

interface IUpdate {
  productId: string;
  updateUserInput: UpdateUserInput;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ userId }: IFindOne) {
    return await this.userRepository.findOne({
      where: { userId: userId },
    });
  }

  async create({ email, password, name, age }) {
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({ email, password, name, age });
  }

  async update({ email, password, name, age }) {
    const user = await this.userRepository.findOne({ email });
    const newUser = {
      ...user,
    };
  }
}
