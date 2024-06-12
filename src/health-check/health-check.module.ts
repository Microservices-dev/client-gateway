import { Module } from '@nestjs/common';
import { HealthChekController } from './health-chek.controller';

@Module({
  controllers: [HealthChekController],
})
export class HealthCheckModule {}
