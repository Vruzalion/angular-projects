const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//charger le middleway pour parser le corps de la requete http
app.use(bodyParser.json());

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // mettre à jour pour qu'il corresponde au domaine à partir duquel est faite la demande.
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"); // mettre à jour pour qu'il corresponde au domaine à partir duquel est faite la demande.
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Charger les routes
const { List, Task } = require('./db/models');

/* Gestionnaire de routes*/

// <routes des listes de taches

//GET /lists pour retourner toutes les listes
app.get('/lists', (req, res) => {
    // Retourner un tableau de toutes les listes de la bd
    List.find({}).then((lists) => {
        res.send(lists)
    }).catch((e) => {
        res.send(e);
    })
});

//POST /lists pour retourner toutes les listes
app.post('/lists', (req, res) => {
    // Creer une nouvelle liste et la retourner à l'utilisateur
    // Les informations de la liste seront parser via  la requte body JSPON
    let title = req.body.title; //obtenir la requete parsée

    let newList = new List({
        title
    })
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })

});

//PATH /list/:id pour maj une liste

app.patch('/lists/:id', (req, res) => {
    //maj une liste avec une nouvelle valeur specifiée dans le json de la requete
    List.findOneAndUpdate({
        _id: req.params.id,
    }, {
        $set: req.body,
    }).then(() => {
        res.send({'message': 'Maj effectuée'});
    });
});
app.delete('/lists/:id', (req, res) => {
    //supprimer une liste avec
    List.findOneAndRemove({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});



//routes des taches

//GET /lists/:listId/tasks pour retourner toutes les taches d'une liste donnée
app.get('/lists/:listId/tasks', (req, res) => {
    // Retourner un tableau de toutes les taches d'une liste donnée
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.send(e);
    })
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    // Retourner une seule tache d'une liste donnée
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task)
    }).catch((e) => {
        res.send(e);
    })
});

//POST /lists/:listId/tasks pour retourner toutes les listes
app.post('/lists/:listId/tasks', (req, res) => {
    // Creer une nouvelle tache dans une liste via la listid et la retourner à l'utilisateur
    // Les informations de la tache seront parser via  la requte body JSPON
    console.log( 'helooooooo  '+ req.params.listId);
    let newTask = new Task({
        _listId: req.params.listId,
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline
    })
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })

});

//PATH /lists/:listId/tasks/:taskId pour maj une tâche d'une liste

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    //maj une taches avec une nouvelle valeur specifiée dans le json de la requete
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }, {
        $set: req.body,
    }).then(() => {
        res.send({message: 'màj effectuée'});
    });
});
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    //supprimer une tache d'une liste avec
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
});


app.listen(3000, () => {
    console.log(`Server lancé sur le port 3000`);
});