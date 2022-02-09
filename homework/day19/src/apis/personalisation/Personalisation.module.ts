import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalisationService } from './Personalisation.service';
import { PersonalisationResolver } from './Personalisation.resolver';
import { Personalisation } from './entities/personalisation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personalisation])],
  //   controllers: [AppController],
  providers: [PersonalisationResolver, PersonalisationService],
})
export class PersonalisationModule {}
