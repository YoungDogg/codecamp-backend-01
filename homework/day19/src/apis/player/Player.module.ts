import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './Player.service';
import { PlayerResolver } from './Player.resolver';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  //   controllers: [AppController],
  providers: [PlayerResolver, PlayerService],
})
export class PlayerModule {}
