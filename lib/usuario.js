'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = "user"

class Usuario extends Db{
	
	insertar(data){
		return this.insert(table, data).then(function(result){
			return new Promise(function(resolve, reject) {
				
				resolve(result.generated_keys[0])
			})
		}).error(function(err){
			
			return err
		})
	}

	actualizar(data, chaines){
		return this.update(table, data, chaines).then(function(result){
			return new Promise(function(resolve, reject) {
				
				resolve(result.replaced)
			})
		}).error(function(err){
			
			return err
		})
	}

	eliminar(data){
		return this.delete(table, data).then(function(result){
			return new Promise(function(resolve, reject) {
				
				resolve(result.deleted)
			})
		}).error(function(err){
			
			return err
		})
	}

	consultar(filter){
		return this.consult(table, filter).then(function(result){
			return new Promise(function(resolve, reject) {
				
				resolve(result)
			})
		}).error(function(err){
			
			return err
		})
	}
}

module.exports = Usuario
