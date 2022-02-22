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

  async checkDuplicate({ impUid }) {
    const result = await this.pointTransactionRepository.findOne({ impUid });
    console.log(`result================`);
    console.log(result);
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  //========== 4 CANCEL===================
  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCLE,
    });
    if (pointTransaction)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  async hasPntEnugh2Cancel({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다');

    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('취소가능한 포인트가 부족합니다.');
  }
  async cancel({ impUid, amount, currentUser }) {
    const pointTransaction = await this.create({
      impUid,
      amount: -amount, // 충전한 걸 취소하는 것이니까
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCLE,
    });

    return pointTransaction;
  }
  //=================================================
  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT, // DEFAULT값 넣어줄 때
  }) {
    // 1. pointTransaction 테이블의 거래기록 생성
    if (!status) status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT;
    const pointTransaction = await this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status,
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
