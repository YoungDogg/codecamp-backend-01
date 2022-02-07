import { Brand } from 'src/apis/brand/entities/brnad.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  productDescription: string;
  @Column()
  shippingDescription: string;
  @Column()
  size: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column()
  quantaty: number;

  @JoinColumn() // 생략가능
  @OneToOne(() => CouponCode) // 여러개 상품, 하나의 할인쿠폰
  couponCode: CouponCode;
  
  @ManyToOne(() => Image) // 여러개 상품, 하나의 이미지
  image: Image;
  @ManyToOne(() => Player) // 여러개 상품, 하나의 선수
  player: Player;
  @ManyToOne(() => Brand) // 여러개 상품, 하나의 브랜드
  brand: Brand;
  @ManyToOne(() => Personalisation) // 여러개 상품, 하나의 커스텀
  personalisation: Personalisation;

  @JoinTable() // 중간 테이블을 만든다. 둘 중 한군데에 만든다.
  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products) // 여러개 상품, 여러개의 서브카테고리
  subCategory: SubCategory[];
}
