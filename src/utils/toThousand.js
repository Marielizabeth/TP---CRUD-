module.exports = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//para colocar separador de miles. ej: de 10442.52 a 10.442.52

//cuando una funcion es versatil la modularizamos para tenerla accesible y requerirla en diferentes partes del proyecto.