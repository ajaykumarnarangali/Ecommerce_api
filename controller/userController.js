const User = require('../model/userSchema');
const { errorHandler } = require('../utils/errorHandler');


module.exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return next(errorHandler(401, "user not exists"));
        }

        res.status(200).json({ user })

    } catch (error) {
        next(error);
    }
}


module.exports.allUser = async (req, res, next) => {
    try {

        if (!req.user.isAdmin) {
            return next(errorHandler(401, "you are not admin"));
        }

        const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

        res.status(200).json({ users });

    } catch (error) {
        next(error)
    }
}

module.exports.changeRole = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(401, "you are not an admin"));
        }

        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findById(id);
        if (!role) {
            return next(errorHandler(401, "enter all the fields"));
        }
        if (!user) {
            return next(errorHandler(401, "user not found"));
        }

        user.isAdmin=role==='Admin'?true:false;

        await user.save();

        res.status(200).json({user});

    } catch (error) {
        next(error)
    }
}