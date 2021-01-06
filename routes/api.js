// const userModel = require("../models/users");
const router = require("express").Router();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');
const studentModel = require('../models/mongodb')

function createUser(data){

let user = new studentModel(data);
    return user.save();   //also add the return coz its a promise
 
//    let user = userModel.build(data);
//   return user.save();
};

function getUserByEmail(email){
    // return studentModel.find({ email: email })
    return studentModel.findOne({
        where: {
            email: email
        }
    });
};

function Auth(res, user) {
    var token = jwt.sign({
        userId: user.id,
        username: user.username,
        email: user.email
    }, secret, {
        expiresIn: '1h'
    });

    res.cookie("userAccess", token);
    return token;
};

router.post('/login', (req, res) => {
    let data = req.body;
    getUserByEmail(data.email).then((result) => {
        const password = passwordHash.verify(data.password, result.password);
        if(password){
           let token = Auth(res, result);
            res.json({
                success: true,
                message: "Login Successful"
            })
        } else {
            res.json({
                success: false,
                message: "Login Failed, incorrect email or password"
            })
        }
    }).catch(() => {
        res.json({
            success: false,
            message: `No account found with ${data.email}`
        })
    })
});

router.post("/signup", (req, res) => {
    let userInfo = req.body;

    getUserByEmail(userInfo.email).then((result) => {
        console.log (result);
        if(result){
            res.json({
                success: false,
                message: "Email already used"
            })
        } else {
            createUser({
                ...userInfo,
                password: passwordHash.generate(userInfo.password)
            }).then((result) => {
                let token = Auth(res, result);
                res.json({
                    success: true,
                    message: 'Account Successfull Created'
                })
            }).catch(() => {
                res.json({
                    success: false,
                    message: 'Sign up failed, please correct the provided information'
                })
            })
        }
    }).catch((error) => {
        console.log(error);
        res.json({
            success: false,
            message: 'something went wrong'
        })
    })
});

router.get('/users', (req, res) => {
    userModel.findAll().then((users) => {
        res.json(users);
    }); 
});

module.exports =router;