import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { Mission } from 'src/database/entities/mission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/database/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Player])],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
