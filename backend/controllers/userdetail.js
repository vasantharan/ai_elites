const { user } = require('../models/user')

module.exports.userDetails = async (req, res) => {
    const email = req.user.email
    const userAcc = await user.findOne({email})
    const det = {
        name: userAcc.name,
        email: userAcc.email
    }
    res.send(det)
}