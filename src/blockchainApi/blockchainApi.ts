import got from "got"
import { BlockchainApiBlock } from "./blockData"

const baseUrl: string = "https://blockchain.info";

export default class BlockchainApi {

    async getChainInfo(): Promise<string> {
        const epoch = Math.floor(Date.now());

        try {
            console.log(`${baseUrl}/blocks/${epoch}?format=json`);
            const resp = await got(`${baseUrl}/blocks/${epoch}?format=json`);

            return resp.body;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    async getBlockInfo(id: string): Promise<BlockchainApiBlock> {
        try {
            const resp = await got(`${baseUrl}/rawblock/${id}`);
            const body = await resp.body;
            return JSON.parse(body) as BlockchainApiBlock;
        } catch (e) {
            return null;
        }
    }
}