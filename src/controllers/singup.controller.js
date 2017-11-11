const Account = require('../models/Account');

function singup(req, res) {
    const {
        name,
        email,
        password,
        phone,
    } = req.body;

    const account = {
        name,
        email,
        password,
        phone: Array.isArray(phone) && phone.map(tel => ({
            number: tel.number,
            prefix: tel.prefix,
        })),
        updated_at: new Date(),
        logged_at: new Date(),
    };

    Account.update(
        { email },
        {
            ...account,
            $setOnInsert: { created_at: new Date() },
        },
        { upsert: true },
        (err) => {
            if (err) {
                res.status(500).send({ status: err });
            }
            res.send({ status: 'ok' });
        },
    );
}

module.exports = singup;
