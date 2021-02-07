import express from "express";
import BlockchainApi from "./blockchainApi";
import ICache from "./cache/ICache";
import RedisCache from "./cache/redisCache";

const app = express();
const PORT = 8000;


const chainApi: BlockchainApi = new BlockchainApi();

const cache: ICache = new RedisCache()


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

    cache.setWithTimeout("blocks", result, 2);
    return res.send(result);
})

app.get("/block/:chain", async (req, res) => {
    if (req.params && req.params.chain && typeof req.params.chain === "string") {
        const chainId: string = req.params.chain;
        const cachedBlock = await cache.get(`block-${chainId}`);
        if (cachedBlock) {
            return res.send(cachedBlock);
        }

        const chainData = await chainApi.getBlockInfo(chainId);
        if (chainData === "") {
            return res.sendStatus(404)
        }

        cache.setWithTimeout(`block-${chainId}`, chainData, 60);
        return res.send(chainData);
    }

    return res.send("Error")
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});