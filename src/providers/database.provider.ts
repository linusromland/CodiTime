import * as mongoose from 'mongoose';

const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> => {
			mongoose.set('strictQuery', false);
			return mongoose.connect('mongodb://127.0.0.1:27017/coditime');
		}
	}
];

export default databaseProviders;
