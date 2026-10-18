import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { REDIS_CLIENT } from './redis/redis.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisStore = new RedisStore({
  client: app.get(REDIS_CLIENT),
});

app.use(
  session({
    store: redisStore,
  }),
);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
