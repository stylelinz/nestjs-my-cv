import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

const APP_PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });

  const config = new DocumentBuilder()
    .addCookieAuth()
    .setTitle('My CV')
    .addServer(`http://localhost:${APP_PORT}`)
    .build();

  const apiDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, apiDocument);

  app.useLogger(app.get(Logger));

  await app.listen(APP_PORT).catch((error) => {
    console.error(error);
  });

  console.log(`🚀 Service start at http://localhost:${APP_PORT}`);
}
bootstrap();
