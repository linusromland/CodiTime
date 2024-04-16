// External dependencies
import * as mongoose from 'mongoose';

// Internal dependencies
import { MONGODB_URI } from 'src/utils/env';

const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> => {
			mongoose.set('strictQuery', false);
			return mongoose.connect(MONGODB_URI);
		}
	}
];

export default databaseProviders;
