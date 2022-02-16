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
  email: string;
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

  async findOne({ email }: IFindOne) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async create({ email, hashedPassword: password, name, age, point }) {
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({
      email,
      password,
      name,
      age,
      point,
    });
  }

  async update({ email, hashedPassword: password, name, age, point }) {
    const user = await this.userRepository.findOne({ email });
    const newUser = {
      ...user,
      password,
      name,
      age,
      point,
    };
    console.log(`==========update user=============`);
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }
}
