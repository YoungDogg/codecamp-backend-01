import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}
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
    const user = await this.userRepository.findOne({ id: currentUser.id });

    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        point: user.point + amount,
      },
    );

    // 4. 최종결과 돌려주기
    return PointTransaction;
  }
}
