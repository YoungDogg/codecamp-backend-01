import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Personalisation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => Boolean)
  isPersonalisationAvailable: boolean;
  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => String)
  armBadge: string;
  @Column()
  @Field(() => String)
  customContents: string;

  //--------------product추가할 예정----------
}
