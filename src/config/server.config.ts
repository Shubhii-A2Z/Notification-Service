process.loadEnvFile();

export default{
    PORT: process.env.PORT,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_HOST: process.env.REDIS_HOST,
}