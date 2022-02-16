import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum ORDER_STATUS_ENUM {
  CINFIRMED = 'CINFIRMED',
  CANCELED = 'CANCELED',
}

registerEnumType(ORDER_STATUS_ENUM, {
  name: 'ORDER_STATUS_ENUM',
});
@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @JoinColumn()
  @OneToOne(() => User)
  userId: string;

  @ManyToOne(() => Product)
  productId: string;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
    default: ORDER_STATUS_ENUM.CINFIRMED,
  })
  @Field(() => ORDER_STATUS_ENUM, { nullable: true }) // 기본으로 주문완료라고 함
  status: ORDER_STATUS_ENUM;
}
