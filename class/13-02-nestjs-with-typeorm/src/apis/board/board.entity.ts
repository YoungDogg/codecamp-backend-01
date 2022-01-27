import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  number: number; // 자동으로 생성되는 것 id 이다.
  @Column()
  writer: string;
  @Column()
  title: string;
  @Column()
  contents: string;
}
