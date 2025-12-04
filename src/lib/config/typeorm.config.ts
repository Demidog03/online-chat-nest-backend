import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Users } from '../../modules/users/users.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const host = configService.get<string>('DB_HOST');
    const port = configService.get<string>('DB_PORT');
    const username = configService.get<string>('DB_USERNAME');
    const password = configService.get<string>('DB_PASSWORD');
    const database = configService.get<string>('DB_NAME');

    return {
      type: 'postgres',
      host: host ?? 'localhost',
      port: port ? Number(port) : 5432,
      username: username ?? 'postgres',
      password: password ?? '',
      database: database ?? 'postgres',
      synchronize: true,
      logging: true,
      entities: [Users],
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
