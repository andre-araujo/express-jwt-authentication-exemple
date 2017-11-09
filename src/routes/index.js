app.post('/api/singup', require('../controllers/singup.controller.js'));
app.post('/api/singin', require('../controllers/singin.controller.js'));

app.all('*', (req, res) => {
    res.send({
        status: 'not found',
    });
});
