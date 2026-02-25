import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExcludePasswordInterceptor } from './interceptors/exclude-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://cedricrgt45-server.eddi.cloud:5173',
      'http://cedricrgt45-server.eddi.cloud',
      'https://questarena-frontend.onrender.com',
      'https://sc1yefa3951.universe.wf',
    ],
    credentials: true,
  });

  app.useGlobalInterceptors(new ExcludePasswordInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Challenge Gaming')
    .setDescription('API pour la plateforme de challenges de jeux vidéo')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
