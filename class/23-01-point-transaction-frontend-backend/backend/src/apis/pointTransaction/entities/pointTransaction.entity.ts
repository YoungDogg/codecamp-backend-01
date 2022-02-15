import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { user } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCLE = 'CANCLE',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
    name: 'POINT_TRANSACTION_STATUS_ENUM'
})

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  impUid: string;
  @Column()
  @Field(() => Int)
  amount: number;
  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @CreateDateColumn() // 자동으로 날짜 등록
  createdAt: Date;

  @ManyToOne(() => user)
  user: user;
}
