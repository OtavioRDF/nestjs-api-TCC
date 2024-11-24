import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/database/entities/player.entity';
import { Mission } from 'src/database/entities/mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Mission])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
