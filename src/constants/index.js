module.exports = {
    mongoURL: 'mongodb://127.0.0.1:27017/expressauth',
    appPort: parseInt(process.env.PORT, 10) || 3000,
    secret: 'somesecretkey',
};
