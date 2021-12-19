const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//productos parseados declarado en dos variables.

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	// metodo que va a renderizar el index
	index: (req, res) => {
		/* res.send(products)// siempre corroborar si todo llega bien */
		return res.render('index',{
			products,
			toThousand,
			finalPrice
		})		
	},

	// metodo que va a resolver la busqueda de productos
	search: (req, res) => {
		let result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
		return res.render('results',{
			products : result,
			toThousand,
			finalPrice,
			busqueda : req.query.keywords.trim()

		})
	},
};
//este formulario tiene una propiedad que se llama keywords
//por params siempre va lo que colocamos por parametro en la ruta (puede ser id u otro)
//formularios: pueden viajar por dos formas, GET o POST.
//Cuando va por POST va por BODY
//Cuando va por GET va por QUERY
//let result= products filtrado (filter) donde cada elemento es un product y va a filtrar de los product.name lo que incluya(includes) lo que recibo por req.query.keywords
 
module.exports = controller;


