import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req,res) => {
    const {name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        
        if (existingUser){
            return res.status(400).json({message: "User already exists"});

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({message: "User registerd successfully"});

    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};