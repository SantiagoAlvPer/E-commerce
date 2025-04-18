import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./services/app.module";
import { connectToMongoDB } from "./config/mongodb.config";

async function bootstrap() {
  await connectToMongoDB(); // 👈 Asegúrate de que esta línea esté arriba
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(3000);
}

bootstrap();
