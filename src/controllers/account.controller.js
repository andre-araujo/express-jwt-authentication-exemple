const Account = require('../models/Account');

function accountController(req, res) {
    Account.findOne({
        _id: req.user.id,
    }, (err, account) => {
        if (err) {
            res.status(500).send({ status: err });
        }

        if (!account) {
            res.status(404).send({ status: 'User not found' });
        }

        res.json({
            status: 'Success',
            account: {
                id: account._id,
                name: account.name,
                email: account.email,
                phone: account.phone.map(tel => ({
                    number: tel.number,
                    prefix: tel.prefix,
                })),
                created_at: account.created_at,
                updated_at: account.updated_at,
                logged_at: account.logged_at,
            },
        });
    });
}

module.exports = accountController;
