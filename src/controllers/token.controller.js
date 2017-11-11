const { MD5 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const { secret } = require('../constants');

const Account = require('../models/Account');

function tokenController(req, res) {
    const {
        email,
        password,
    } = req.body;

    Account.findOneAndUpdate(
        {
            email,
            password: MD5(password).toString(),
        },
        { $set: { logged_at: new Date() } },
        (err, account) => {
            if (err) {
                res.status(500).send({ status: err });
            }

            if (account) {
                const payload = { id: account._id };
                const token = jwt.sign(payload, secret, { expiresIn: '30m' });

                res.json({ token });
            } else {
                res.status(401).send({
                    status: 'User or password invalid',
                });
            }
        },
    );
}

module.exports = tokenController;
