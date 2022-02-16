import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  age: number;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  point: number;
}
