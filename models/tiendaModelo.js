'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({

    nombre: String,
    descripcion: String,
    marca: String,
    precio: Number,
    garantia: Number,
    image: String

});

//para el proyecto creo que creare dos esquemas uno para el producto 
//y uno para el usuario producto 

//segun esto tendria que guardarlo en la ruta 
module.exports = mongoose.model('Producto', ProjectSchema);