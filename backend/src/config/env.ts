import dotenv from 'dotenv'

dotenv.config();

const requiredEnvVariables = [
    "PORT",
    "MONGODB_URI",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES_IN",
    "NODE_ENV",
];

requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export const env = {
    PORT: Number(process.env.PORT),
    MONGODB_URI: process.env.MONGODB_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string,
    JWT_ACCESS_EXPIRES_IN: Number(process.env.JWT_ACCESS_EXPIRES_IN),
};