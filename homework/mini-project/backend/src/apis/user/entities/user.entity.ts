import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { PointTransaction } from 'src/apis/pointTransaction/entities/pointTransaction.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) 비밀번호 노출 금지
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ default: 0})
  @Field(() => Float, { nullable: true })
  point: number;

}
