// External dependencies
import { Schema } from 'mongoose';

export const ProjectSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		heartbeats: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Heartbeat'
			}
		]
	},
	{
		timestamps: true
	}
);
