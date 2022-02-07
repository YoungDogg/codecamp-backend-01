import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productSalesLocation/entities/productSalesLocation.entity';
import { User } from 'src/apis/user/entities/user.entity';
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
import { ProductTag } from '../../productTag/entities/productTag.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @JoinColumn() // 생략가능
  @ManyToOne(() => ProductCategory) // 여러개 상품, 하나의 카테고리
  productCategory: ProductCategory;

  @JoinColumn() // 생략가능
  @ManyToOne(() => User) // 여러개 상품, 하나의 유저
  user: User;

  @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 여러개 상품, 하나의 유저
  productTags: ProductTag[];
}
