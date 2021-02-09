import BlockData, {ChainData} from "../blockList/BlockData";

// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = process.env.API_ENDPOINT;

export async function fetchBlocks(): Promise<BlockData | never> {
    return fetchApi<BlockData>("blocks");
}

export async function fetchBlockData(hash: string): Promise<ChainData | never> {
    return fetchApi<ChainData>(`block/${hash}`);
}

async function fetchApi<T>(endpoint: string): Promise<T | never> {
    console.log(`Pinging: ${baseUrl}/${endpoint}`)
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`);
        const blocks = await response.json()
        return blocks as T;
    } catch (e) {
        console.error(e);
        throw e;
    }
}