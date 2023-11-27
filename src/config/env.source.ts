import { ConfigModule, ConfigService } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
  isGlobal: true,
});

const configService = new ConfigService();

export default configService;
