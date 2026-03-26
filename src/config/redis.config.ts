import Redis from "ioredis";

import serverConfig from "./server.config";
import logger from "./logger.config";

// Singleton Pattern
function connectToRedis(){
    try {
        let connection: Redis;

        const redisConfig={
            port: serverConfig.REDIS_PORT,
            host: serverConfig.REDIS_HOST,
            maxRetriesPerRequest: null,
        }

        return ()=>{
            if(!connection){
                connection=new Redis(redisConfig);
            }
            return connection;
        }

    } catch (error) {
        logger.error("Error connecting to redis");
        throw error;
    }
}

export const getRedisConnection=connectToRedis();