'use strict'
var express=require('express');
var ProjectContoller=require('../controllers/tiendaController');

var router=express.Router();
var multipart=require('connect-multiparty');
var multipartMiddleware=multipart({uploadDir:'./uploads'});

router.get('/home',ProjectContoller.home);
router.get('/test',ProjectContoller.test);
router.post('/saveProducto',ProjectContoller.saveProducto);
router.get('/products',ProjectContoller.getProductos);
router.get('/product/:id?',ProjectContoller.getProducto);

//rutas para update y delete las mismas pero el metodo cambia 
router.put('/product/:id',ProjectContoller.updateProducto);
router.delete('/product/:id',ProjectContoller.deleteProducto);

//rutas que manejan la subida de la imagen 
router.post('/uploadImage/:id',multipartMiddleware, ProjectContoller.uploadImage);
router.get('/getImage/:image',ProjectContoller.getImageFile);


module.exports=router;