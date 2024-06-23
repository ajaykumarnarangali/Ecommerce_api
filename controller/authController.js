const User = require('../model/userSchema');
const { errorHandler } = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const {generateToken}=require('../utils/generateToken');

module.exports.Register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const { profileImage } = req.body;

        if (!email || !username || !password) {
            return next(errorHandler(401, "enter all the fields"))
        }

        if (profileImage) {
            console.log("there is image");
        }

        const isEmailexist = await User.findOne({ email });

        if (isEmailexist) {
            return next(errorHandler(401, "email already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            ...(profileImage && {profileImage})
        })

        await newUser.save();

        const { password: pass, ...rest } = newUser._doc

        res.status(201).json({ message: "registration successfull", user: rest });

    } catch (error) {
        next(error);
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(errorHandler(401, "enter all the fields"));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(401, "email doesn't exist"));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(errorHandler(401, "Incorrect password"));
        }

        generateToken(user,res);

        const {password:pass,...rest}=user._doc;

        res.status(200).json({message:'Login successfully',user:rest})
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports.Signout=async(req,res,next)=>{
    try {

        res.cookie("access_token",null,{maxAge:0}).json({message:"user sign-out successfully"});
        
    } catch (error) {
        next(error)
    }
}