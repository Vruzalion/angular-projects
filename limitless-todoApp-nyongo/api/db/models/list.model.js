const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        minLength:1,
        trim: true //pour supprimer les espaces au debut et à la fin du titre d'une liste
    }
})

const List = mongoose.model('List', ListSchema)

module.exports = {List}