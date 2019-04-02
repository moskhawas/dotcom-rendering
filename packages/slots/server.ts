import express from 'express';

const app = express();
const port = 3050;

app.get('/', (req, res) => res.send('Hello World foo!'));

// tslint:disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
