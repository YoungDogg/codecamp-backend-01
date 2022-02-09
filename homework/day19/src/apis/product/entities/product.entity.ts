import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Brand } from 'src/apis/brand/entities/brand.entity';
import { SubCategory } from 'src/apis/category/subCategory/entities/subCategory.entity';
import { Image } from 'src/apis/image/entities/image.entity';
import { Personalisation } from 'src/apis/personalisation/entities/personalisation.entity';
import { Player } from 'src/apis/player/entities/player.entity';
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
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;
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

  @DeleteDateColumn() // 소프트삭제 제 4 방법
  deletedAt: Date;

  @JoinColumn({})
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory, { cascade: true, onDelete: 'CASCADE' }) // 여러개 상품, 하나의 카테고리
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 여러개 상품, 하나의 유저
  @Field(() => [ProductTag])
  productTags: ProductTag[];
  // ==============================================================================================
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
