import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const APP_PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addCookieAuth()
    .setTitle('My CV')
    .addServer(`http://localhost:${APP_PORT}`)
    .build();

  const apiDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, apiDocument);

  await app.listen(APP_PORT).catch(console.error);

  console.log(`🚀 Service start at http://localhost:${APP_PORT}`);
}
bootstrap();
