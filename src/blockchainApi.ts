import got from "got"
import redis from "redis"

const baseUrl: string = "https://blockchain.info"

export default class BlockchainApi {

    async getChainInfo(): Promise<string> {
        const resp = await got(`${baseUrl}/blocks?format=json`);
        return resp.body
    }

    async getBlockInfo(id: string):Promise<string> {
        try {
            const resp = await got(`${baseUrl}/rawblock/${id}`);
            return resp.body;
        } catch (e) {
            return "";
        }
    }
}