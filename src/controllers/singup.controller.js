const { MD5 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const {
    SECRET,
    TOKEN_EXPIRATION_TIME,
    SUCCESS,
} = require('../constants');

const Account = require('../models/Account');

function singup(req, res) {
    const {
        phone,
        password,
        ...accountData
    } = req.body;

    const account = {
        ...accountData,
        password: MD5(password).toString(),
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
        { new: true, upsert: true },
        (err, updatedAccount) => {
            if (err) {
                res.status(500).send({ status: err });
            }

            const payload = { id: updatedAccount.id };
            const token = jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });

            const {
                password,
                ...updatedAccountResult
            } = updatedAccount.toObject();

            res.json({
                status: SUCCESS,
                token,
                account: updatedAccountResult,
            });
        },
    );
}

module.exports = singup;
