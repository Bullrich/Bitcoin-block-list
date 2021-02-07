import express from "express";
import BlockchainApi from "./blockchainApi";
import redis from "redis"

const {promisify} = require("util");
const app = express();
const PORT = 8000;

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);


const chainApi: BlockchainApi = new BlockchainApi();


client.on("error", (error) => {
    console.error(error);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.json({message: "Everything ok!"}));

app.get("/blocks", async (req, res) => {
    const cachedBlocks: string = await getAsync("blocks");
    if (cachedBlocks) {
        return res.send(cachedBlocks)
    }
    const result = await chainApi.getChainInfo();

    client.set("blocks", result, "EX", 2);
    return res.send(result);
})

app.get("/block/:chain", async (req, res) => {
    if (req.params && req.params.chain && typeof req.params.chain === "string") {
        const chainId: string = req.params.chain;
        const cachedBlocks: string = await getAsync(`block-${chainId}`);
        if (cachedBlocks) {
            return res.send(cachedBlocks);
        }

        const chainData = await chainApi.getBlockInfo(chainId);
        if (chainData === "") {
            return res.sendStatus(404)
        }
        client.set(`block-${chainId}`, chainData, "EX", 60)
        return res.send(chainData);
    }

    return res.send("Error")
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});