import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Qtim test task API docs')
  .setDescription(
    'This is the documentation for the Qtim test task server API.\n',
  )
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Posts')
  .build();
