const User = require('../models/User');


class userController {
    static getHome = async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
}

module.exports = userController;