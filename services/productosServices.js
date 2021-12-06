const faker = require('faker');
const conexion = require('./../config/bd');

class productosServicios {

    constructor(){
        this.products = [];
        this.generar();
    }

    generar(){
      const limit = 100;
      for (let index = 0; index < limit; index++) {
       this.products.push({
        'id': faker.datatype.uuid(),
        'name': faker.commerce.productName(),
        'precio': faker.commerce.price(),
        'color': faker.commerce.color(),
        'subcategoria': faker.commerce.department()
       });
      }
    }

    genera_query(){}

    get_producto(id){
      return this.products.find(item =>item.id === id)
    }

    get_listadoMarcas(){
      return this.products;
    }

    get_listadoSubcategorias(){
      return new Promise((resolve, reject) => {
        conexion.query(`SELECT ecpro_id, ecpro_nombre, ecpro_estatus FROM ECPR_productos`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
      });
      //conexion.query('SELECT ecpro_id, ecpro_nombre, `ecpro_estatus` FROM ECPR_productos');
    }

}

module.exports = productosServicios;
