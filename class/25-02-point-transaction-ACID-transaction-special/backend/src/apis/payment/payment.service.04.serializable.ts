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
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회시 락을 걸고 조회, 다른 쿼리에 대기시킴 - select for update
      const payment = await queryRunner.manager.find(Payment, {
        lock: { mode: 'pessimistic_write' },
      });
      console.log(payment);

      // 커밋이 5초간의 시간이 걸림을 가정
      setTimeout(() => {
        queryRunner.commitTransaction();
      }, 5000);
      return payment;
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회를 했을 때 락을 기다리고 조회
      const payment = await queryRunner.manager.find(Payment);
      console.log('철수 조회=============');
      console.log(payment);
      console.log('=====================');
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
    // finally {
    //   queryRunner.release();
    // }
  }
}
