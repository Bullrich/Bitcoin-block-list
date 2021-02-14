import ICache from "./ICache";
import NodeCache from "node-cache";

export default class LocalCache implements ICache {
    private readonly cache: NodeCache;

    constructor() {
        this.cache = new NodeCache();
    }

    get(key: string): Promise<string> {
        return Promise.resolve(this.cache.get<string>(key));
    }

    set(key: string, value: string): void {
        this.cache.set(key, value);
    }

    setWithTimeout(key: string, value: string, secondToExpire: number): void {
        this.cache.set(key, value, secondToExpire);
    }
}