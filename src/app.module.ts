import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { configModule } from './config/env.source';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    ProjectsModule,
  ],
})
export class AppModule {}
