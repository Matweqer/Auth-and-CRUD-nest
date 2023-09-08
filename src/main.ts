import { NestFactory } from '@nestjs/core';

import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './swagger.options';

import { AppModule } from './app.module';

import * as process from 'process';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

bootstrap();
