import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 

async function aaa() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters();
  await app.listen(3000);
}
aaa();
