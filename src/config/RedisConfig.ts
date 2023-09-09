import { Redis } from "ioredis";

export class RedisConfig {
    connection(): Redis {
        const redisHost = process.env.REDIS_HOST;
        const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
        const redisPassword = process.env.REDIS_PASSWORD;

        return new Redis(
            {
                host: redisHost,
                password: redisPassword,
                port: redisPort
            }
        );
    }
}