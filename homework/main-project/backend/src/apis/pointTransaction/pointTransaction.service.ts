import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly connection: Connection,
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
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  //========== For CANCEL===================
  async checkAlreadyCanceled({ impUid }) {
    const queryRunner = await this.connection.createQueryRunner(); // Builder는 복잡한 쿼리문일때라는데... 더 알아봐야겠다.
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const pointTransaction = await queryRunner.manager.findOne(
        PointTransaction,
        {
          impUid,
          status: POINT_TRANSACTION_STATUS_ENUM.CANCLE,
        },
        { lock: { mode: 'pessimistic_write' } },
      );
      if (pointTransaction)
        throw new ConflictException('이미 취소된 결제 아이디입니다.');
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async hasPntEnugh2Cancel({ impUid, currentUser }) {
    console.log(`hasPntEnugh2Cancel==============`);
    const queryRunner = await this.connection.createQueryRunner(); // Builder는 복잡한 쿼리문일때라는데... 더 알아봐야겠다.
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      console.log('try');
      const pointTransaction = await queryRunner.manager.findOne(
        PointTransaction,
        {
          impUid,
          user: { id: currentUser.id },
          status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        },
        { lock: { mode: 'pessimistic_write' } },
      );
      console.log(`pointTransaction============`);
      console.log(pointTransaction);
      if (!pointTransaction)
        throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다');
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } },
      );
      console.log(`user===================`);
      console.log(user);
      if (user.point < pointTransaction.amount)
        throw new UnprocessableEntityException(
          '취소가능한 포인트가 부족합니다.',
        );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async cancel({ impUid, amount, currentUser }) {
    // create함수 안에 queryRunner 있으니 열외
    const pointTransaction = await this.create({
      impUid,
      amount: -amount,
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
    const queryRunner = await this.connection.createQueryRunner(); // Builder는 복잡한 쿼리문일때라는데... 더 알아봐야겠다.
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. pointTransaction 테이블의 거래기록 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저 정보 조회
      // let user = await this.userRepository.findOne({
      //   id: currentUser.id,
      // });
      let user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id }, //
        { lock: { mode: 'pessimistic_write' } },
      );
      // 3. 유저의 돈 업데이트
      const updateUser = await this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updateUser);
      await queryRunner.commitTransaction();
      // 4. 최종결과 돌려주기
      return pointTransaction; // <------ return PointTransaction (X)
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
