import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Brand } from 'src/apis/brand/entities/brand.entity';
import { SubCategory } from 'src/apis/category/subCategory/entities/subCategory.entity';
import { CouponCode } from 'src/apis/couponcode/entities/couponcode.entity';
import { Image } from 'src/apis/image/entities/image.entity';
import { Personalisation } from 'src/apis/personalisation/entities/personalisation.entity';
import { Player } from 'src/apis/player/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  productDescription?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  shippingDescription?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  size?: string;
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  price?: number;
  @Column({ default: 0, nullable: true })
  @Field(() => Int, { nullable: true })
  stock?: number;

  @JoinColumn() // 생략가능
  @OneToOne(() => CouponCode) // 여러개 상품, 하나의 할인쿠폰
  @Field(() => CouponCode, { nullable: true })
  couponCode?: CouponCode;

  @ManyToOne(() => Image) // 여러개 상품, 하나의 이미지
  @Field(() => Image, { nullable: true })
  image?: Image;
  @ManyToOne(() => Player) // 여러개 상품, 하나의 선수
  @Field(() => Player, { nullable: true })
  player?: Player;
  @ManyToOne(() => Brand) // 여러개 상품, 하나의 브랜드
  @Field(() => Brand, { nullable: true })
  brand?: Brand;
  @ManyToOne(() => Personalisation) // 여러개 상품, 하나의 커스텀
  @Field(() => Personalisation, { nullable: true })
  personalisation?: Personalisation;

  @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products) // 여러개 상품, 여러개의 서브카테고리
  @Field(() => [SubCategory], { nullable: true })
  subCategory?: SubCategory[];
}
