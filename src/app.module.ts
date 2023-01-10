// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import databaseProvider from './providers/database.provider';

@Module({
	imports: [],
	controllers: [],
	providers: [...databaseProvider],
	exports: [...databaseProvider]
})
export class AppModule {}
