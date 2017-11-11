const jwt = require('jwt-simple');
const { secret } = require('../constants');

const Account = require('../models/Account');

function singup(req, res) {
    const {
        phone,
        ...accountData
    } = req.body;

    const account = {
        ...accountData,
        phone: Array.isArray(phone) && phone.map(tel => ({
            number: tel.number,
            prefix: tel.prefix,
        })),
        updated_at: new Date(),
        logged_at: new Date(),
    };

    Account.findOneAndUpdate(
        { email: accountData.email },
        {
            ...account,
            $setOnInsert: { created_at: new Date() },
        },
        { upsert: true, passRawResult: true },
        (err, updatedAccount) => {
            if (err) {
                res.status(500).send({ status: err });
            }

            const payload = { id: updatedAccount._id };
            const token = jwt.encode(payload, secret);

            const {
                _id,
                password,
                ...updatedAccountResult
            } = updatedAccount.toObject();

            res.json({
                status: 'Success',
                token,
                account: {
                    id: _id,
                    ...updatedAccountResult,
                },
            });
        },
    );
}

module.exports = singup;
