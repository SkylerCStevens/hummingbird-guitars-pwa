const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const secret = process.env.JWT_SECRET

const signToken = (user) => {
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, secret)
}

const verifyToken = (req, res, next) => {
    const token = req.get('token') || req.body.token || req.query.token

    if(!token) return res.json({success: false, message: "No token procided"})
    jwt.verify(token, secret, (err, decodedData) => {
        if(err) return res.json({success: false, message: "Invalid token."})
        User.findById(decodedData._id, (err, user) => {
            if(!user) return res.json({success: false, message: "Invalid token."})
            req.user = user

            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}