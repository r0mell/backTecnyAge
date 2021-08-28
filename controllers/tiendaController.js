'use strict'
var Producto = require('../models/tiendaModelo');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/tiendaModelo');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: "Soy la home de la tienda"
        });

    },
    test: function (req, res) {
        return res.status(500).send({
            message: "Soy la pagina test"
        });
    },

    //metodos para un CRUD
    //create
    saveProducto: function (req, res) {
        var producto = new Producto()
        var params = req.body;

        producto.nombre = params.nombre;
        producto.descripcion = params.descripcion;
        producto.marca = params.marca;
        producto.precio = params.precio;
        producto.garantia = params.garantia;
        producto.image = null;

        producto.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });
            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });
            return res.status(200).send({ producto: projectStored });
        });
    },

    //para obtener un solo producto funciona !!!!!!
    //read all
    getProductos: function (req, res) {
        Producto.find({}).exec((err, producto) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos de los productos' });
            if (!producto) return res.status(404).send({ message: 'No hay productos para mostrar' });
            return res.status(200).send({ producto });
        });
    },

    //para obtener un solo producto funciona !!!!!!
    //read by ID
    getProducto: function (req, res) {
        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe' });
        Producto.findById(projectId, (err, producto) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!producto) return res.status(404).send({ message: 'El proyecto no existe' });
            return res.status(200).send({ producto });
        });
    },

    //update by id funciona !!!
    updateProducto: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;
        Producto.findByIdAndUpdate(projectId, update, { new: true }, (err, productoUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar los datos' });
            if (!productoUpdate) return res.status(404).send({ message: 'No existe para actualizar' });
            return res.status(200).send({ producto: productoUpdate });
        });
    },

    //delete by id funciona!!!
    deleteProducto: function (req, res) {
        var projectId = req.params.id;
        Producto.findByIdAndRemove(projectId, (err, productoRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido borrar el producto' });
            if (!productoRemoved) return res.status(404).send({ message: 'No se puede eliminar el producto' });
            return res.status(200).send({ producto: productoRemoved });
        });
    },

    //para subir una imagen 
    uploadImage:function(req,res){
        var projecId=req.params.id;
        var fileName='Imagen no subida...';

        if(req.files){
            var filePath=req.files.image.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif'){
                Producto.findByIdAndUpdate(projecId,{image:fileName},{new:true},(err,projectUpdated)=>{
                    if(err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!projectUpdated) return res.status(404).send({message:'El proyecto no existe y  no se subio la imagen'});
                    return res.status(200).send({project:projectUpdated});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extensión no es válida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    
    //para obtener una imagen funcionaaaaaa!!!!!
    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen...'
                });
            }
        });
    } 

}

module.exports = controller;
