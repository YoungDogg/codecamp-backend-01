import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CouponCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  isCouponCodeAvailable: boolean;
  @Column()
  discountAmount: number;
}
