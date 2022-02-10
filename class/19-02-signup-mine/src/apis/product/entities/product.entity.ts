import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productSalesLocation/entities/productSalesLocation.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductTag } from '../../productTag/entities/productTag.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => String, { nullable: true })
  description: string;
  @Column()
  @Field(() => Int)
  price: number;
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;
  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  // @DeleteDateColumn() // 소프트삭제 제 4 방법
  // deletedAt: Date;

  @JoinColumn({})
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory, { cascade: true, onDelete: 'CASCADE' }) // 여러개 상품, 하나의 카테고리
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @JoinColumn() // 생략가능
  @ManyToOne(() => User) // 여러개 상품, 하나의 유저
  @Field(() => User)
  user: User;

  @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 여러개 상품, 하나의 유저
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
