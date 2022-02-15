import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {nullable: true})
  number: number;

  @Column()
  @Field(() => String, {nullable: true})
  writer: string;

  @Column()
  @Field(() => String, {nullable: true})
  title: string;

  @Column()
  @Field(() => String, {nullable: true})
  contents: string;
}
