// This is the place where we read environment variables. i.e .env or from server conf.

import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.NODE_ENV;
export const ON_PROD = ENVIRONMENT === 'production';

export const NEWS_API: string = process.env.NEWS_API || null;
export const DEFAULT_REGION = process.env.DEFAULT_REGION || 'GB';

if (!NEWS_API) {
    logger.error('NEWS API string is missing in environment variable.');
    process.exit(1);
}
