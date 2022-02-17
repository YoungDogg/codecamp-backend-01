import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // @Column({ default: 0 })
  @Column()
  // @Field(() => Int, { nullable: true })
  @Field(() => Int)
  amount: number;
}
