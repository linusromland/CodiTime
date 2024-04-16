// External dependencies
import { config } from 'dotenv';

// Configure dotenv
config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coditime';
