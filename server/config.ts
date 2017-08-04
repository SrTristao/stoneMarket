export const HOST: string = process.env.HOST || 'http://localhost:3000';
export const PORT: number = <any>process.env.PORT || 3000;
export const ENV: string = process.env.ENV || 'development';

export const SECRET: string = process.env.SECRET || 'whatever';

export const SENTRY_KEY: string = process.env.SENTRY_KEY || '';