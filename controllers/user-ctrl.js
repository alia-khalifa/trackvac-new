const User = require('../models/user');

validateUser = async (req, res) => {
    try {
        if (req.session.isVaccine) {
            res.send({
                success: true,
                message: 'Took vaccine',
            });
            next();
        }
        const { vacID, nationalID } = req.body;
        if (!vacID || !nationalID) {
            return res.send({
                success: false,
                message: 'You must provide vacID and nationalID',
            });
        }
        const user = await User.findOne({ vacID, nationalID });

        if (user.firstDose) {
            req.session.isVaccine = true;
            return res.send({
                success: true,
                message: 'Can add review',
            });
        }
        else if (user) {
            return res.status(401).send({
                success: false,
                message: 'Sorry, you did not take the vaccine yet',
            });
        }
    }
    catch (e) {
        return res.send({
            valid: false,
            error: 'Error in user validation',
        });
    }
}

module.exports = { validateUser };