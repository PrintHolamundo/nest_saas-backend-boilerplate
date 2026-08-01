import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoDbService } from './mongodb.service';

@Global()
@Module({})
export class MongoDbModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoDbModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            uri: config.getOrThrow<string>('MONGODB_URI'),
          }),
        }),
      ],
      providers: [MongoDbService],
      exports: [MongoDbService],
    };
  }
}