import express from 'express';
// rest of the code remains same
const app = express();
const PORT = 8000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/', (req, res) => res.json({message: 'Everything ok!'}));

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});