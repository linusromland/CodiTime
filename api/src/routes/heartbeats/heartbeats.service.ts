// External dependencies
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

// Internal dependencies
import { Heartbeat, Project, Response } from 'src/interfaces';

@Injectable()
export class HeartbeatsService {
	constructor(
		@Inject('HEARTBEAT_MODEL')
		private HeartbeatModel: Model<Heartbeat>,
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<Project>
	) {}

	async create(project: string, heartbeat: Heartbeat): Promise<Response> {
		try {
			if (!project || !heartbeat) {
				return {
					success: false,
					message: 'Required parameters missing'
				};
			}

			const createdHeartbeat = new this.HeartbeatModel(heartbeat);
			await createdHeartbeat.save();

			// Find project by name, upsert if not found
			await this.ProjectModel.findOneAndUpdate(
				{ name: project },
				{ $push: { heartbeats: createdHeartbeat } },
				{ upsert: true, new: true }
			);

			return {
				success: true,
				message: 'Heartbeat created successfully'
			};
		} catch (error) {
			return {
				success: false,
				message: 'Heartbeat creation failed'
			};
		}
	}
}
