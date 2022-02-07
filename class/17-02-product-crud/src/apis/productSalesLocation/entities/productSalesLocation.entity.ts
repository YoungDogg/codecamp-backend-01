import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSalesLocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  address: string;
  @Column()
  @Field(() => String)
  addressDetail: string;
  @Column()
  @Field(() => Float)
  lat: number;
  @Column()
  @Field(() => Float)
  lng: number;
  @Column({ type: 'timestamp' })
  @Field(() => Date)
  arriveAt: Date;

  // soldedAt : Date
}
