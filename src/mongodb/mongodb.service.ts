import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoDbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoDbService.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.connection.asPromise();

    this.logger.log('Database connection established');
  }

  async onModuleDestroy(): Promise<void> {
    await this.connection.close();

    this.logger.log('Database connection closed');
  }

  getConnection(): Connection {
    return this.connection;
  }

  get isConnected(): boolean {
    return this.connection.readyState === 1;
  }
}