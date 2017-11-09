const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3000;

global.app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://127.0.0.1:27017/expressauth',
    {
        useMongoClient: true,
    },
);

require('./routes/index.js');

app.listen(3000, () => {
    process.stdout.write(`> Ready on http://localhost:${port}\n`);
});
