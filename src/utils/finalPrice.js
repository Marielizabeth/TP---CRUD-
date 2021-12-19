const toThousand = require('./toThousand');

module.exports = (price, discount) => toThousand(price - (discount * price /100).toFixed(0));

 // una funcion que recibe el precio y el descuento y aplicando toThousand devuelve que el precio (descuento * precio /100) y se aplica toFixed.

/*  <!-- para mostrar el precio final calculando con el porcentaje de descuento que tiene cada producto -->
 <!-- toThousand p/agregar separador de miles y toFixed p/ quitar los decimales --> */