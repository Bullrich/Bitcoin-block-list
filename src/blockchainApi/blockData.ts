export  interface BlockData{
    size:number;
    index: number;
    previous_hash:string;
}

/**
 * Data format for the blockchain.info api
 */
export  interface BlockchainApiBlock {
    size:number;
    block_index: number;
    prev_block:string;
    tx: Transaction[];
    height:number;
    weight:number;
}

export interface Transaction{
    hash:string;
    relayed_by: string;
    time: number;
    block_height: number;
    weight: number;
    size: number;
}

export function convertApiBlock(apiBlock: BlockchainApiBlock) : BlockData{
    return new DataBlock(apiBlock);
}

class DataBlock implements BlockData{
    size:number;
    index: number;
    previous_hash:string;

    constructor(apiBlock : BlockchainApiBlock){
        this.size = apiBlock.size;
        this.index = apiBlock.block_index;
        this.previous_hash = apiBlock.prev_block;
    }
}