const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
    mongoURL,
    appPort,
} = require('./constants');

global.app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(
    mongoURL,
    {
        useMongoClient: true,
    },
);

require('./routes/index.js');

app.listen(appPort, () => {
    process.stdout.write(`> Ready on http://localhost:${appPort}\n`);
});
