export default interface ICache {
    get(key: string): Promise<string>;

    set(key: string, value: string): void;

    setWithTimeout(key: string, value: string, secondToExpire: number): void;
}

export class DefaultCache implements ICache {
    get(key: string): Promise<string> {
        return Promise.resolve(null);
    }

    set(key: string, value: string): void {
        // nothing happens here
    }

    setWithTimeout(key: string, value: string, secondToExpire: number): void {
        // nothing happens here
    }

}