import { Redis } from "ioredis";
import { RedisConfig } from "../config/RedisConfig";


export class TokenRepository {

    redis: Redis;

    constructor() {
        this.redis = new RedisConfig().connection();
    }
    async saveData(key: string, data: any) {

        const response = await this.redis.setex(key, 900, JSON.stringify(data));
        this.redis.disconnect();
        return response;

    }

    async getData(key: string) {

        const data = await this.redis.get(key) || "";
        this.redis.disconnect();
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error("Error parsing JSON data:", error);
                return null;
            }
        } else {
            return null;
        }

    }
}