const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        minLength:1,
        trim: true //pour supprimer les espaces au debut et à la fin du titre d'une tâche
    },
    description:{
        type: String,
        minLength:1,
        trim: true //pour supprimer les espaces au debut et à la fin du titre d'une tâche
    },
    deadline:{
        type: Date,
        minLength:1,
        trim: true //pour supprimer les espaces au debut et à la fin du titre d'une tâche
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed : {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = {Task}