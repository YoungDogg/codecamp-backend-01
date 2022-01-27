import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  number: number; // 자동으로 생성되는 것 id 이다.
  @Column()
  @Field(() => String)
  writer: string;
  @Column()
  @Field(() => String)
  title: string;
  @Column()
  @Field(() => String)
  contents: string;
}
