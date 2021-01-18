var Casamento = require('../models/casamentos')

//Devolve lista de Casamentos
module.exports.findall = (filter,fields) => {
    return Casamento.find(filter,fields).exec()
}

module.exports.findone = id => {
    return Casamento.findOne({ _id: id }).exec()
}

module.exports.distinct = field => {
    return Casamento.distinct(field).exec()
}

module.exports.findAuthors = () => {
    return Casamento.find({},{ authors:1, _id:0 }).exec()
}

module.exports.create = c => {
    return Casamento.create(c)
}

module.exports.delete = id => {
    return Casamento.deleteOne({ _id: id })
}

module.exports.update = c => {
    return Casamento.updateOne({ _id: c._id }, { $set: c })
}