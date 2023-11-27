import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import configService from './env.source';

export const DataSourceConfig: DataSourceOptions = {
  type: configService.get('TYPE_DB') as any,
  host: configService.get('HOST_DB'),
  port: configService.get('PORT_DB'),
  username: configService.get('USER_DB'),
  password: configService.get('PASS_DB'),
  database: configService.get('NAME_DB') as string,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
