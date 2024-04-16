// External dependencies
import { Document } from 'mongoose';

interface File {
	readonly path: string;
	readonly name: string;
	readonly extension: string;
}

export interface Heartbeat extends Document {
	readonly file: File;
	readonly operatingSystem: string;
	readonly hostname: string;
	readonly branch?: string;
	readonly editor: string;
	readonly time: number;
}
