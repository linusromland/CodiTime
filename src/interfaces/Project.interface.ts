// External dependencies
import { Document } from 'mongoose';

// Internal dependencies
import { Heartbeat } from './';

export interface Project extends Document {
	readonly name: string;
	readonly userId: string;
	readonly heartbeats?: Heartbeat[];
}
