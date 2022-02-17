import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async findAll() {
  //   return await this.pointTransactionRepository.find();
  // }

  // async findOne({ id }) {
  //   const point = await this.pointTransactionRepository.findOne({ id });
  //   if (!point) throw new UnprocessableEntityException('없는 포인트목록입니다');
  //   return point;
  // }

  checkDuplicate({ impUid }) {
    const result = this.pointTransactionRepository.findOne({ impUid });
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  async create({ impUid, amount, currentUser }) {
    // 1. pointTransaction 테이블의 거래기록 생성

    const pointTransaction = await this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    await this.pointTransactionRepository.save(pointTransaction);

    // 2. 유저 정보 조회
    let user = await this.userRepository.findOne({
      id: currentUser.id,
    });
    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        point: user.point + amount,
      },
    );
    // console.log(`PointTransaction====================`);
    // console.log(pointTransaction);
    // 4. 최종결과 돌려주기
    return pointTransaction; // <------ return PointTransaction (X)
  }
}
