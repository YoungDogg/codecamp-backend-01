import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly connection: Connection,
  ) {}
  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);
      // 5초 뒤에 어쨌든 실패함
      setTimeout(async () => {
        queryRunner.rollbackTransaction(); // 더티리드가 된다.
      }, 5000);
      // await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
    // finally {
    //   queryRunner.release();
    // }
  }
  async findAll() {
    // 5초 이내에 커밋안된 내용을 조회가능함 -> 더티리드
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      const payment = await queryRunner.manager.find(Payment);
      // const payment = await this.paymentRepository.find(); // <-- 이 방법이 아니다.
      return payment;
    } catch (error) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
