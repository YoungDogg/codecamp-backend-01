import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  brandId: string;
  @Column()
  @Field(() => String)
  name: string;
}
