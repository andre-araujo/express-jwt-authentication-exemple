const express = require('express');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

require('./src/index.js')(app);

app.listen(3000, () => {
    process.stdout.write(`> Ready on http://localhost:${port}\n`);
});
