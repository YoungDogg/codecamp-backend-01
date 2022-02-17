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

    private readonly connection: Connection, // Query Runner 만들어 볼 예정
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
    // this.connection.createQueryBuilder();   // 더 복잡한 쿼리문
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); // DB랑 연결이 된다.
    await queryRunner.startTransaction();

    try {
      // 1. pointTransaction 테이블의 거래기록 생성

      const pointTransaction = await this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      throw new Error(); // 강제로 에러 만들어서 롤백되게 만들어보자, 등록된 게 없어졌는지 확인해보자

      // 2. 유저 정보 조회
      let user = await this.userRepository.findOne({
        id: currentUser.id,
      });
      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   {
      //     id: user.id,
      //   },
      //   {
      //     point: user.point + amount,
      //   },
      // );

      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction(); //커밋이 끝나야 제대로 된 것이다.

      // console.log(`PointTransaction====================`);
      // console.log(pointTransaction);
      // 4. 최종결과 돌려주기
      return pointTransaction; // <------ return PointTransaction (X)
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 다시 돌려놓는다.
    } finally {
      // await queryRunner.release();
    }
  }
}
