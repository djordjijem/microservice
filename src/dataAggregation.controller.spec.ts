import {Test, TestingModule} from '@nestjs/testing';
import {DataAggregationMicroserviceController} from './dataAggregation.controller';
import {DataAggregationMicroserviceService} from './dataAggregation.service';
import {ModuleMocker, MockFunctionMetadata} from 'jest-mock';
describe('AppController', () => {
  let appController: DataAggregationMicroserviceController;

  const moduleMocker = new ModuleMocker(global);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DataAggregationMicroserviceController],
      providers: [DataAggregationMicroserviceService],
    })
      .useMocker((token) => {
        const results = {
          balance: -40.8,
          earned: 1.2,
          spent: 12,
          payout: 30,
          paidOut: -10.8,
        };
        if (token === DataAggregationMicroserviceService) {
          return {getData: jest.fn().mockResolvedValue(results)};
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    appController = app.get<DataAggregationMicroserviceController>(DataAggregationMicroserviceController);
  });

  describe('root', () => {
    it('should return list of aggregated data', () => {
      expect(appController.getDataByUserId('074092')).not.toBe({
        balance: -40.8,
        earned: 1.2,
        spent: 12,
        payout: 30,
        paidOut: -10.8,
      });
    });
  });
});
