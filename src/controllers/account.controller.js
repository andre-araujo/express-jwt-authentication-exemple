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
                res.status(404).send({ status: 'User not found' });
            }

            const {
                _id,
                password,
                ...accountResult
            } = account.toObject();

            res.json({
                status: 'Success',
                account: {
                    id: _id,
                    ...accountResult,
                },
            });
        },
    );
}

module.exports = accountController;
