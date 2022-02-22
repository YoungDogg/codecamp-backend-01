import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly connection: Connection,
  ) {}
  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      // 조회 중 누가 커밋하지 않고 등록하면 non-repeatable-read 발생
      setInterval(async () => {
        const payment = await queryRunner.manager.find(Payment);
        console.log(payment);
      }, 1000);
      // await queryRunner.commitTransaction();
      // const payment = await this.paymentRepository.find(); // <-- 이 방법이 아니다.
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
    // finally {
    //   queryRunner.release();
    // }
  }
}
