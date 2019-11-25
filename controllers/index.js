const User = require('../models/user.model')
const signToken = require('../auth').signToken

module.exports = {
    index: async (req, res) => {
        try{
            const user = await User.find()
            res.send(user)
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    },

    show: async (req, res) => {
        try{
            const user = await User.findById(req.params.id)
            res.send(user)
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    },

    create: async (req, res) => {
        try {
            const user = await User.create(req.body)
            const token = signToken(user)
            res.json({success: true, message: "User created. Token attached", token})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    },

    update: async (req, res) => {
        try{
            const user = await User.findById(req.params.id)
            Object.assign(user, req.body)
            user.save((err, updatedUser) => {
                res.json({success: true, message: "User updated.", user})
            })
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    },

    destroy: async (req, res) => {
        try{
            const user = await User.findByIdAndRemove(req.params.id)
            res.json({success: true, message: "User deleted.", user})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    },

    authenticate: async (req, res) => {
        try{
            console.log(req.body)
            const user = await User.findOne({username: req.body.username})
            if(!user || !user.validPassword(req.body.password, user.password)){
                return res.json({success: false, message: "Invalid credentials"})
            }
            const token = signToken(user)
            res.json({success: true, message: "Token attached.", token})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
}