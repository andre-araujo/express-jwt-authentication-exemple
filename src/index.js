module.exports = function App(app) {
    app.get('/api', (req, res) => {
        res.send({
            status: 'ok',
        });
    });
};
