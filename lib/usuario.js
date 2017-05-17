'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = "user"

class Usuario extends Db{
	
	insertar(data){
		return this.insert(table, data)
		.then(result => {
			return result.generated_keys[0]
		}).catch(err => {
			return err
		})
	}

	actualizar(data, chaines){
		return this.update(table, data, chaines)
		.then(function(result){
			return result.replaced
		}).catch(err => {
			return err
		})
	}

	eliminar(data){
		return this.remove(table, data)
		.then(function(result){
			return result.deleted
		}).catch(err => {
			return err
		})
	}

	consultar(filter){
		return this.queries(table, filter)
	}
}

module.exports = Usuario
