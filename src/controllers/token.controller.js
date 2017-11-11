const jwt = require('jwt-simple');
const { secret } = require('../constants');

const Account = require('../models/Account');

function tokenController(req, res) {
    const {
        email,
        password,
    } = req.body;

    if (!email && !password) {
        res.status(403).send({
            status: 'Unauthorized',
        });
    }

    Account.findOneAndUpdate(
        {
            email,
            password,
        },
        { $set: { logged_at: new Date() } },
        (err, account) => {
            if (err) {
                res.status(500).send({ status: err });
            }
            if (account) {
                const payload = { id: account._id };
                const token = jwt.encode(payload, secret);

                res.json({ token });
            } else {
                res.status(403).send({
                    status: 'Unauthorized',
                });
            }
        },
    );
}

module.exports = tokenController;
