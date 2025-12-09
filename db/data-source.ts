import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  logging: true,
};

const dataSource = new DataSource({
  ...dataSourceOptions,
  entities: ['src/**/*.entity.ts'],
  migrations: ['*.ts'],
});

export default dataSource;
