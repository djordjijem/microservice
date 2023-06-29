import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataAggregationMicroserviceController } from './dataAggregation.controller';
import { DataAggregationMicroserviceService} from './dataAggregation.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [DataAggregationMicroserviceController],
  providers: [DataAggregationMicroserviceService],
})
export class DataAggregationModule {}
