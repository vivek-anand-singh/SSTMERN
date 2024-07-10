const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ // It's good practice to use a 400 status code for client errors
                success: false,
                message: "User already exists"
            });
        }
        const salt = await bcrypt.genSalt(10)
        const tempPass =  await bcrypt.hash(req.body.password , salt);
        req.body.password = tempPass;

        const newUser = new User(req.body);
        await newUser.save(); // Save the new user to the database
        return res.status(201).json({ // Also good to return JSON here for consistency
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        return res.status(500).json({ // Sending JSON response with error message
            success: false,
            message: error.message
        });
    }
});

// Placeholder for login route
router.post("/login", async (req, res) => {

    //check if user exists of not
    const user = await User.findOne({email:req.body.email})
    //if no user by that email
    if(!user){
        res.send({
            sucess: false,
            message:"User doesnt exist , please register"
        })
    }



    //check if password if correct opr not
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.send({
            success: false,
            message: "Invalid pass"
        })
    }else {
        res.send({
            success: true,
            message:"login successful"
        })
    }

});

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ // Consistently return JSON in error responses
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
