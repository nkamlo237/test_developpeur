const User = require("../models/User");

const registerUser = async (req, res, next) => {
    try {
        const { firstName, secondName, phone, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            //return res.status(400).json({ message: "User already exists!" });
            throw new Error("User already exists!");
        }

        const newUser = await User.create({ firstName, secondName, phone, email, password });
        const userResponse = {
            _id: newUser._id,
            avatar: newUser.avatar,
            firstName: newUser.firstName,
            secondName: newUser.secondName,
            phone: newUser.phone,
            email: newUser.email,
            token: await newUser.generateJWT(),
        };

        return res.status(201).json(userResponse);
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user) {
            throw new Error("User not found");
        }

        if(await user.comparePassword(password)){
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                firstName: user.firstName,
                secondName: user.secondName,
                phone: user.phone,
                email: user.email,
                token: await user.generateJWT(),
            });
        } else {
            throw new Error("email or user invalid!");
        }

    } catch (error) {
        next(error);
    }
}


module.exports = {
    registerUser, 
    loginUser, 
};