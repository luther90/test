const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.getOneUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const docs = await UserModel.findById(req.params.id).select('-password')
        res.status(200).json(docs);
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json({ message: 'suppression reussite' })
    } catch (err) {
        res.status(500).json(err.message)
    }
}