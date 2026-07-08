import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Danh sách domain được phép gọi API — thêm domain Vercel thật vào đây.
  // Có thể override qua biến môi trường FRONTEND_URL (phân tách bởi dấu phẩy)
  // để không cần sửa code mỗi khi đổi domain.
  const defaultOrigins = [
    'http://localhost:3001',
    'https://bysms-bakary-management-sytems.vercel.app',
  ];
  const envOrigins = process.env.FRONTEND_URL?.split(',').map((o) => o.trim());

  app.enableCors({
    origin: envOrigins ?? defaultOrigins,
    credentials: true,
  });

  // Render (và hầu hết nền tảng cloud) tự cấp PORT qua biến môi trường,
  // hardcode 3000 sẽ khiến app lắng nghe sai cổng khi deploy.
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
void bootstrap();
