import * as mongoose from 'mongoose';

const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> => mongoose.connect('mongodb://localhost/nest')
	}
];

export default databaseProviders;
