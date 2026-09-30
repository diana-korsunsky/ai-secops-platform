import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

export const REDIS_CLIENT = 'REDIS_CLIENT'

@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: REDIS_CLIENT,

      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        const client = createClient({
          socket: {
            host: '127.0.0.1',
            port: 6379,
          },

          password: configService.getOrThrow<string>('REDIS_PASSWORD'),
        })

        await client.connect()

        return client
      },
    },
  ],

  exports: [REDIS_CLIENT],
})
export class RedisModule {}