import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

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
  @OneToOne(()=> ProductSalesLocation)
  productSalesLocation:ProductSalesLocation
  // soldedAt : Date
}
