// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { databaseProviders, schemaProviders } from '../../providers';
import { HeartbeatsService } from './heartbeats.service';
import { HeartbeatsController } from './heartbeats.controller';

@Module({
	controllers: [HeartbeatsController],
	providers: [HeartbeatsService, ...databaseProviders, ...schemaProviders],
	exports: [...databaseProviders, ...schemaProviders]
})
export class HeartbeatsModule {}
