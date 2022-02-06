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
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @JoinColumn() // 생략가능
  @ManyToOne(() => MainCategory) // 여러개 서브카테고리, 하나의 메인카테고리
  mainCategory: MainCategory;

  // @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => Product, (products) => products.subCategory)
  products: Product[];
}
