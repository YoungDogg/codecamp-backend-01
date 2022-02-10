import { Field, Int, ObjectType } from '@nestjs/graphql';
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
  // @Field(() => String) // can't go to front-end; it's password
  password: string;
  @Column()
  @Field(() => Int)
  age: number;
}
