
const passportJWT = require('passport-jwt');
const { secret } = require('../constants');

const Account = require('../models/Account');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const opts = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new JwtStrategy(opts, ((payload, done) => {
    Account.findOne({
        _id: payload.id,
    }, (err, account) => {
        if (err) {
            return done(new Error(err), null);
        }

        if (!account) {
            return done(new Error('User not found'), null);
        }

        return done(null, { id: account._id });
    });
}));

module.exports = strategy;
