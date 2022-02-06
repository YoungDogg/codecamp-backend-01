import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Personalisation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  isPersonalisationAvailable: boolean;
  @Column()
  name: string;
  @Column()
  armBadge: string;
  @Column()
  customContents: string;

  //--------------product추가할 예정----------
}
