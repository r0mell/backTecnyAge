'use strict'
var mongoose = require('mongoose');

var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyectos')
    .then(() => {
        console.log("Conexion a la bdd establecida con exito....");
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en el puerto 3700");
        })
    })
    .catch(err => console.log(err));
