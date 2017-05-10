'use strict'

var Db = require('./db')

let table = 'maintenance'

class Mantenimiento extends Db {

	insertar(data){
		return this.insert(table, data).then(function(result){
			return new Promise(function(resolve, reject) {
				console.log("Clave generada: " + result.generated_keys[0])
				resolve(result.generated_keys[0])
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	actualizar(data, chaines){
		return this.update(table, data, chaines).then(function(result){
			return new Promise(function(resolve, reject) {
				console.log("Cambios: " + result.replaced)
				resolve(result.replaced)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	eliminar(data){
		return this.delete(table, data).then(function(result){
			return new Promise(function(resolve, reject) {
				console.log("Eliminados: " + result.deleted)
				resolve(result.deleted)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	/*consultar(filter, callback){
		return this.consult(table, filter).error(function(err){
			return new Promise(function(resolve, reject) {
				console.log(result)
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}*/

	consultar(opciones){
		return this.consult(table,opciones).then(function(result){
			return new Promise(function(resolve, reject) {
				resolve(result)
			})
		}).error(function(err){
			return err
		})
	}

	consultarGrupo(filter, callback){
		return this.consultgrupo(table, filter).error(function(err){
			return new Promise(function(resolve, reject) {
				console.log(result)
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	consultarReporte(filter, callback){
		return this.consultaReporte(table, filter).error(function(err){
			return new Promise(function(resolve, reject) {
				console.log(result)
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
		
	}
}

module.exports = Mantenimiento