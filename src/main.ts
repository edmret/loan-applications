import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Enhanced Loan Application Processing Service Challenge')
    .setDescription(
      'microservice that manages loan applications, including submission, status checks, and admin management. Optionally, add authentication and authorization to secure the service and manage user roles.',
    )
    .setVersion('1.0')
    .addTag('loans')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
