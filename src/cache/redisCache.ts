import redis from "redis";
import {promisify} from "util";
import ICache from "./ICache";

export default class RedisCache implements ICache {
    private readonly client: redis.RedisClient;
    private readonly getAsync: (key: string) => Promise<string|null>

    constructor(customHost?: string) {
        if (customHost) {
            this.client = redis.createClient({host: customHost});
        } else {
            this.client = redis.createClient();
        }

        this.getAsync = promisify(this.client.get).bind(this.client);

        this.client.on("error", (error) => {
            console.error(error);
        });
    }

    async get(key: string): Promise<string> {
        return this.getAsync(key);
    }

    set(key: string, value: string): void {
        this.client.set(key, value)
    }

    setWithTimeout(key: string, value: string, secondToExpire: number): void {
        this.client.set(key, value, "EX", secondToExpire)
    }
}