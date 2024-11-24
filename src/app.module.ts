import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database/database.module';
import { PrometheusController } from './prometheus.controller';
import { PrometheusService } from './prometheus.service';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    PlayersModule,
    MissionModule,
  ],
  controllers: [PrometheusController],
  providers: [PrometheusService],
})
export class AppModule {}
