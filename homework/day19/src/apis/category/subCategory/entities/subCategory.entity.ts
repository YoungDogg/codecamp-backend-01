import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MainCategory } from '../../mainCategory/entities/mainCategory.entity';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  name: string;

  @JoinColumn() // 생략가능
  @Field(() => MainCategory)
  @ManyToOne(() => MainCategory) // 여러개 서브카테고리, 하나의 메인카테고리
  mainCategory: MainCategory;

  // @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => Product, (products) => products.subCategory)
  @Field(() => [Product], { nullable: true })
  products?: Product[];
}
