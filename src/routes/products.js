// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
//trae todos los productos

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
//para cargar la vista del formulario. siempre va por get
router.post('/create/', productsController.store); 
//cuando recibo la informacion sensible, el formulario recibe la información y la envia al servidor, usa la misma ruta /products/create pero a traves del metodo post.
//EN APP.JS LA RUTA YA ACLARA /PRODUCTS POR ESO SE COLOCA SOLO /CREATE.
//buena practica: la ruta que va por post lleva el mismo nombre: create
//los links (a href van por GET)

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 
//id es un parametro

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
//metodo que va a renderizar el formulario de edicion de producto.
//se llama a traves de esta ruta y a traves del id que va a recibir como parametro al producto que matchee con ese id.
router.put('edit/:id/', productsController.update); 
//actualizar los datos de un registro existente.
//esta ruta que recibe los datos a actualizar tiene que llamarse de la misma manera, porque hay que enviarle al servidor el producto que quiero actualizar. Se manda toda la informacion y el id del producto que necesitamos que modifique. 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id/', productsController.destroy); 

/* un CRUD tiene en general esta estructura:
-Mostrar todos los productos,
-cargar el formulario de carga de productos
-guardar los datos del productos
-mostrar un producto
-mostrar el formulario de edicion de un producto
-actualizar los datos de esa edicion de un producto
-eliminar un producto */


//patch si quisieramos hacer una actualizacion parcial.

module.exports = router;
