import { NestFactory } from '@nestjs/core';
import { DataAggregationModule } from './dataAggregation.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(DataAggregationModule);
    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            port: 3000,
        },
    });

    await app.listen(3000);
}
bootstrap();
