const Account = require('../models/Account');

function singup(req, res) {
    const {
        name,
        email,
        password,
        phone,
    } = req.body;

    if (!name || !email || !password || !phone || !Array.isArray(phone)) {
        res.send({ status: 'Missing information' });
    }

    const account = {
        name,
        email,
        password,
        singup_date: new Date(),
        phone: phone.map(tel => ({
            number: tel.number,
            prefix: tel.prefix,
        })),
    };

    Account.update(
        { email },
        account,
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
