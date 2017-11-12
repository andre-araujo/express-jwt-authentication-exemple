module.exports = {
    MONGO_URL: 'mongodb://127.0.0.1:27017/expressauth',
    APP_PORT: parseInt(process.env.PORT, 10) || 3000,
    SECRET: 'somesecretkey',
    TOKEN_EXPIRATION_TIME: '30m',
    SUCCESS: 'ok',
    NOT_FOUND: 'not found',
    USER_NOT_FOUND: 'user not found',
    INVALID_USER: 'invalid user or password',
    INVALID_SESSION: 'invalid session',
    UNAUTHORIZED: 'unauthorized',
};
