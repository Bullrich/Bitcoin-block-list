import express from "express";
import BlockchainApi from "./blockchainApi/blockchainApi";
import ICache from "./cache/ICache";
import RedisCache from "./cache/redisCache";
import {convertApiBlock} from "./blockchainApi/blockData";

const app = express();

app.set('json spaces', 4);

const PORT = 8000;

const chainApi: BlockchainApi = new BlockchainApi();

const redisHost = process.env.REDIS_HOST;

const cache: ICache = new RedisCache(redisHost);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.json({message: "Everything ok!"}));

app.get("/blocks", async (req, res) => {
    const cachedBlocks = await cache.get("blocks");
    if (cachedBlocks) {
        return res.send(cachedBlocks)
    }
    const result = await chainApi.getChainInfo();
    if(!result){
        return res.sendStatus(404);
    }

    cache.setWithTimeout("blocks", result, 30);
    return res.json(result);
})

app.get("/block/:chain", async (req, res) => {
    if (req.params && req.params.chain && typeof req.params.chain === "string") {
        const chainId: string = req.params.chain;
        const cachedBlock = await cache.get(`block-${chainId}`);
        if (cachedBlock) {
            return res.send(cachedBlock);
        }

        const chainData = await chainApi.getBlockInfo(chainId);
        if (!chainData) {
            return res.sendStatus(404)
        }

        const returnObject = convertApiBlock(chainData);
        const objectJson = JSON.stringify(returnObject);
        console.log(returnObject);

        cache.setWithTimeout(`block-${chainId}`, objectJson, 60 * 60 * 24);
        res.json(returnObject);
    }

    return res.send("Error")
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});