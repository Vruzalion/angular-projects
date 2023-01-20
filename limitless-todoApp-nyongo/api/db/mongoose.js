// fichier pour connecter l'application à la bd mongo db

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb://127.0.0.1/TaskManager', { useNewUrlParser: true }).then(() => {
        console.log("Connexion reussie bebe");
    }).catch((e) => {
        console.log("Erreur lors de la connexion à MongoDB");
        console.log(e);
    });



module.exports = {
    mongoose
}

