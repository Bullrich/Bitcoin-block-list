export default interface BlockData {
    blocks: BlockDefinition[]
}

export interface BlockDefinition {
    height: number;
    hash: string;
    time: number;
    main_chain: boolean
}

export  interface ChainData{
    size:number;
    index: number;
    previous_hash:string;
}