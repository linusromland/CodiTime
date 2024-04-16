// External dependencies
import { Body, Controller, HttpException, Post, Logger } from '@nestjs/common';
import { Heartbeat, Response } from 'src/interfaces';

// Internal dependencies
import { HeartbeatsService } from './heartbeats.service';

@Controller('heartbeats')
export class HeartbeatsController {
	private readonly logger = new Logger(HeartbeatsController.name);

	constructor(private readonly heartbeatsService: HeartbeatsService) {}

	@Post()
	async create(@Body() body: { project: string; heartbeat: Heartbeat }) {
		const response: Response = await this.heartbeatsService.create(body.project, body.heartbeat);

		if (!response || !response.success) {
			this.logger.log('Heartbeat creation failed');
			throw new HttpException(response.message, 400);
		}

		this.logger.log('Heartbeat created successfully');

		return response;
	}
}
