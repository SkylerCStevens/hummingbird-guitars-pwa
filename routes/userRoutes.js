const express = require("express")
const userCtrl = require('../controllers')
const verifyToken = require('../auth').verifyToken

const userRouter = new express.Router()

userRouter.route('/').get(userCtrl.index)

userRouter.route('/').post(userCtrl.create)

userRouter.route('/authenticate').post(userCtrl.authenticate)

userRouter.use(verifyToken)

userRouter.route('/:id').get(userCtrl.show)

userRouter.route('/:id').delete(userCtrl.destroy)

module.exports = userRouter