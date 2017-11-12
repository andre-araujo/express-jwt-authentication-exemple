const {
    SUCCESS,
    USER_NOT_FOUND,
} = require('../constants');

const Account = require('../models/Account');

function accountController(req, res) {
    Account.findOne(
        {
            _id: req.user.id,
        },
        (err, account) => {
            if (err) {
                res.status(500).send({ status: err });
            }

            if (!account) {
                res.status(404).send({ status: USER_NOT_FOUND });
            }

            const {
                _id,
                password,
                ...accountResult
            } = account.toObject();

            res.json({
                status: SUCCESS,
                account: {
                    id: _id,
                    ...accountResult,
                },
            });
        },
    );
}

module.exports = accountController;
