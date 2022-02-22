import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isThumbnail: boolean;

  @Column({ default: 'http://theCannotFindImage.png' })
  @Field(() => String, { defaultValue: 'http://theCannotFindImage.png' })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.id)
  @Field(() => Product, { nullable: true })
  product: Product;

  @DeleteDateColumn()
  deletedTime?: Date;
}
