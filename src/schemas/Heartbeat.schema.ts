// External dependencies
import { Schema } from 'mongoose';

export const HeartbeatSchema = new Schema(
	{
		file: {
			// e.g. /Users/username/Projects/project-name/src/
			path: {
				type: String,
				required: true
			},
			// e.g. index
			name: {
				type: String,
				required: true
			},
			// e.g. js
			extension: {
				type: String,
				required: true
			}
		},
		// e.g. darwin, win32
		operatingSystem: {
			type: String,
			required: true
		},
		// e.g. Svantes-Macbook-Pro, DESKTOP-1234567
		hostname: {
			type: String,
			required: true
		},
		// e.g. master, main
		branch: {
			type: String,
			required: false
		},
		// e.g. vscode
		editor: {
			type: String,
			required: true
		},
		// e.g. 143243 (in milliseconds)
		time: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);
