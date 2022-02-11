import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  // 이름을 바꾼 것이다. hashedpassword
  async create({ email, hashedPassword: password, name, age }) {
    // async create({ email, password, name, age }) { // password로 해도 로그인을 bcrypt.compare로 해놨기 때문에 안된다.
    // const password = hashedPassword;
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
