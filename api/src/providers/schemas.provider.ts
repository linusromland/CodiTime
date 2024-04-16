// External dependencies
import { Connection } from 'mongoose';

// Internal dependencies
import { HeartbeatSchema, ProjectSchema } from '../schemas';

const schemaProviders = [
	{
		provide: 'HEARTBEAT_MODEL',
		useFactory: (connection: Connection) => connection.model('Heartbeat', HeartbeatSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'PROJECT_MODEL',
		useFactory: (connection: Connection) => connection.model('Project', ProjectSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
