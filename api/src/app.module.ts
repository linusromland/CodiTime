// External dependencies
import { Module } from '@nestjs/common';

// Module imports
import { HeartbeatsModule } from './routes/heartbeats/heartbeats.module';

@Module({
	imports: [HeartbeatsModule]
})
export class AppModule {}
