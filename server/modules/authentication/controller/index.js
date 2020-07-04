'use strict';
import config from 'config'
import jwt from 'jsonwebtoken'
import User from '../../userdata/model/index.js'

export function authenticate(req, res, next) {
    console.log(`start authentication process: Username: ${req.body.username}; password: ${req.body.password}`)
    //check if user exist
    User.findOne({name: req.body.username}).then((user) => {
        if(user) {
            console.log('User found: username: '+user.name)
            //now check if password match
            if(user.validPassword(req.body.password)) {
                console.log('Authenticated user')
                //provide auth token to user
                const token = jwt.sign(user.toJSON(), config.get('JWT.SECRET'), {
                    expiresIn: config.get('JWT.EXPIRES'),
                });

                console.log(`Auth Token: ${token}`);
                    user.password = undefined;
                    user.other_data = undefined;
                    user.createdAt = undefined;
                    user.updatedAt = undefined;
                    return res.status(200).json({
                        success: true,
                        message: 'Authentication Successful!',
                        data: { token, user: user }
                    });
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Username or password incorrect!'
                });
            }
        } else {
            return res.status(200).json({
                success: false,
                message: 'Username or password incorrect!'
            });
        }
    })
}


export function register(req, res, next) {
   console.log('Register user details')
   console.log(`name: ${req.body.name}; password: ${req.body.password}; TelNum: ${req.body.telnum}; Email: ${req.body.email}; Address: ${req.body.address}`)
   let body = req.body;
   const user = new User();

   //convert password to hash string
   let password = user.generateHash(req.body.password);
   console.log(`Hashed password: ${password}`)
   Object.assign(user, body, {
    name: req.body.name,
    password: password,
    telnum: req.body.telnum,
    emailid: req.body.email,
    address: req.body.address
   });
   console.log('User created successfully!')
   user.save().then((user) => {
       user.password = undefined;
    return res.status(200).json({
        success: true,
        message: 'User registered',
        user: user
    });
   })
}

export function getData(req, res, next) {
   console.log('return user details. Username', req.headers.username)
   User.findOne({name: req.headers.username}).then((user) => {
       if(user) {
        user.password = undefined;
        user.other_data = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        return res.status(200).json({
            success: true,
            message: 'User data found!',
            user: user
        });
       } else {
        return res.status(200).json({
            success: false,
            message: 'no user found!'
        });
       }
   });
}