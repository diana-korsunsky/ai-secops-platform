import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { CompanyModule } from './companies/company.module.js'
import { CompanyOnboardingRequestModule } from './company_onboarding_requests/company-onboarding-request.module.js'
import { InvitationModule } from './invitations/invitation.module.js'
import { UsersModule } from './users/user.module.js'
import { AuthModule } from './auth/auth.module.js'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),

        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: false,
       
      }),
    }), 
    CompanyModule,
    CompanyOnboardingRequestModule,
    InvitationModule,
    UsersModule,
    AuthModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}