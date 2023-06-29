import {Controller, Get, Param} from '@nestjs/common';
import {DataAggregationMicroserviceService} from './dataAggregation.service';
import {UserDataResponseDto} from './userDataResponse.dto';

@Controller()
export class DataAggregationMicroserviceController {
  constructor(private readonly dataAggregationMicroserviceService: DataAggregationMicroserviceService) {}

  @Get('/data/:userId')
  public async getDataByUserId(@Param('userId') userId: string): Promise<UserDataResponseDto> {
    return await this.dataAggregationMicroserviceService.getData(userId);
  }

  @Get('/payouts/:userId/:amount')
  public async getListOfPayouts(@Param('userId') userId: string, @Param('amount') amount: string): Promise<any> {
    return await this.dataAggregationMicroserviceService.getListOfPayouts(userId, amount);
  }
}
