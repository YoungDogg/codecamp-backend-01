import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Starbucks {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  number: number;
  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => String)
  price: string;
  @Column()
  @Field(() => String)
  kcalPerOnce: string;
  @Column()
  @Field(() => String)
  fat: string;
  @Column()
  @Field(() => String)
  protein: string;
  @Column()
  @Field(() => String)
  salt: string;
  @Column()
  @Field(() => String)
  sugar: string;
  @Column()
  @Field(() => String)
  caffeine: string;
}
