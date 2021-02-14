import BlockData, {ChainData} from "../blockList/BlockData";

// url used as the server is not deployed somewhere else
const url = `${window.location.protocol}//${window.location.hostname}`;

export async function fetchBlocks(): Promise<BlockData | never> {
    return fetchApi<BlockData>("blocks");
}

export async function fetchBlockData(hash: string): Promise<ChainData | never> {
    return fetchApi<ChainData>(`block/${hash}`);
}

async function fetchApi<T>(endpoint: string): Promise<T | never> {
    console.log(`Pinging: ${url}/${endpoint}`)
    try {
        const response = await fetch(`${url}/${endpoint}`);
        const blocks = await response.json()
        return blocks as T;
    } catch (e) {
        console.error(e);
        throw e;
    }
}