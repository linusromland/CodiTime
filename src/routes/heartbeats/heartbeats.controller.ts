// External dependencies
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Heartbeat, Response } from 'src/interfaces';

// Internal dependencies
import { HeartbeatsService } from './heartbeats.service';

@Controller('heartbeats')
export class HeartbeatsController {
	constructor(private readonly heartbeatsService: HeartbeatsService) {}

	@Post()
	async create(@Body() body: { project: string; heartbeat: Heartbeat }) {
		const response: Response = await this.heartbeatsService.create(body.project, body.heartbeat);

		if (!response || !response.success) throw new HttpException(response.message, 400);

		return response;
	}
}
