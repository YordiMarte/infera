import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usage } from '../database/usage.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: configService.get<number>('DB_PORT') ?? 5432,
        username: configService.get<string>('DB_USERNAME') ?? 'infera',
        password: configService.get<string>('DB_PASSWORD') ?? 'infera',
        database: configService.get<string>('DB_NAME') ?? 'infera',
        entities: [Usage],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Usage]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
