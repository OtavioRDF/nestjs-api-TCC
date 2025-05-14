import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database/database.module';
import { PrometheusController } from './prometheus/prometheus.controller';
import { PrometheusService } from './prometheus/prometheus.service';
import { MissionModule } from './mission/mission.module';
import { PerformanceController } from './hash/performance.controller';

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
  controllers: [PrometheusController, PerformanceController],
  providers: [PrometheusService],
})
export class AppModule {}
