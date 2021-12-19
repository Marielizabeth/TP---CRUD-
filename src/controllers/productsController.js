const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		return res.render('products',{
			products,
			finalPrice,
			toThousand
		})
	},

	// Detail - Detail from one product
	// se crea la variable product que va a recibir lo que devuelve el metodo find, que recorre el array products donde cada elemento es un product y a su vez va a devolver solamente el product cuyo id sea igual y pasado a number(+) al id que llega por parametro.
	detail: (req, res) => {
		let product = products.find(product =>  product.id === +req.params.id)
		return res.render('detail', {
			product,
			finalPrice,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description} = req.body; //se hace una constante y se aplica destructuring al body
		let product = { //se crea un objeto literal product con los valores de la propiedad que vienen de la variable anterior
			id : products[products.length -1].id + 1, //de la longitud del array, del ultimo id registrado le sumamos uno.
			name,
			price : +price, //el numero que capturo en el formulario llega como texto por eso hay que convertirlo a number/integer
			discount : +discount,
			category,
			description,
			image : req.file ? req.file.filename : 'default-image.png'

		}
		products.push(product) //al array de products se le pushea el nuevo product
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8'); //para escribir el json
		res.redirect('/products')
	},
	//cuando la informacion viaja por body viaja como texto.

	// Update - Form to edit
	//renderiza formulario de edicion de producto
	//al formulario del producto tengo que mandarle los datos que quiero editar.
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id); //va a devolver el producto que tenga el id que pasa por parametro
		return res.render('product-edit-form',{ //renderizo el form y mando el producto
			products,
			product
		})
	},  
  
	// Update - Method to update
	//recibe los datos del producto a actualizar
	//se recorre al array de products donde cada elemento es un product y si el product.id matchea con lo que me viene por parametro, cada valor va a ir tomando lo que llega (product.name = name)
	update: (req, res) => {
		const {name, price, discount, category, description} = req.body;

		products.map(product => {
			if(product.id === +req.params.id){
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}	
		})
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8'); //para escribir el json
		res.redirect('/products');
	},

    //UPDATE usando forEach
	/* update: (req, res) => {
		const {name, price, discount, category, description} = req.body;
		products.forEach(product => {
			if(product.id === +req.params.id){
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}			
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8'); //para escribir el json
		res.redirect('/products')
	}, */


	// Delete - Delete one product from DB
	//permite eliminar el producto
	//cuando eliminamos un registro que tiene un id correlativo no existe mas ese id.
	destroy : (req, res) => {
		let productsModify = products.filter(product => product.id !== +req.params.id);
		fs.writeFileSync(productsFilePath,JSON.stringify(productsModify,null,2),'utf-8'); //para escribir el json
		res.redirect('/products')
	},
};

module.exports = controller;