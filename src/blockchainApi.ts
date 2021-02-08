import got from "got"

const baseUrl: string = "https://blockchain.info"

export default class BlockchainApi {

    async getChainInfo(): Promise<string> {
        // const yesterday = Date.now();
        const epoch = Math.floor(Date.now());
        console.log("Pinging", `${baseUrl}/blocks/${epoch}?format=json`)
        try {
            const resp = await got(`${baseUrl}/blocks/${epoch}?format=json`);

            return resp.body
        }
        catch (e){
            console.error(e)
            return null;
        }
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