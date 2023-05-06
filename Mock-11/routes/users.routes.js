const { Router } = require("express")
const UserRouter = Router()
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()


//User Registration
UserRouter.post("/register", async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, isAdmin })
            await user.save()
            res.status(201).send({
                "msg": "Registration has been done successfully"
            })
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})


// User Login
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(201).send({
                    "msg": "Logged in successfully", "token": jwt.sign({ "userID": user._id },process.env.secretCode)
                })
            } else {
                res.status(400).send({
                    "msg": "Wrong Credentials"
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

module.exports={
    UserRouter
}