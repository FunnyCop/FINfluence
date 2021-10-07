const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt");
const User = require("../models/user.model");


class UserController {
    registration(req, res){
        const user = new User(req.body);
        user.save()
            .then(()=>{
                res.cookie("usertoken", jwt.sign({_id:user._id}, secret), {httpOnly: true})
                    .json({msg: "success", user: user})

            })
            .catch(err=> res.json(err))
    }


    login(req, res){
        User.findOne({email: req.body.email})
            .then(user=>{
                if(user === null){
                    res.json({msg: "User not found."}) //email is not found
                } else{
                    bcrypt.compare(req.body.loginPw, user.loginPw)
                        .then(loginPwIsValid=>{
                            if(loginPwIsValid){
                                res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                                    .json({msg: "success!"});
                            }else{
                                res.json({msg: "Password Incorrect"}) //incorrect password
                            }
                        })
                        .catch(err => res.json({msg: "Invalid Login Attempt", err}))
                }
            })
            .catch(err=> res.json(err))
    }

    getLoggedInUser(req,res){
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true});
        User.findById(decodedJWT.payload._id)
            .then(user=> res.json({user}))
            .catch(err=> res.json(err))

    }

    logout(req,res){
        res.cookie("usertoken", jwt.sign({_id:""}, secret),{
            httpOnly:true,
            maxAge:0
        }).json({msg: "Logout Successful"})
    }
}
module.exports = new UserController()