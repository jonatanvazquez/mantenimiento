'use strict'

var Db = require('./db')

let table = 'maintenance'

class Mantenimiento extends Db {

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
		.then(result => {
			return result.replaced
		}).catch(err => {
			return err
		})
	}

	eliminar(data){
		return this.remove(table, data)
		.then(result => {
			return result.deleted
		}).catch(err => {
			return err
		})
	}

	consultar(opciones){
		return this.queries(table,opciones)
	}

	consultarGrupo(filter, callback){
		return this.queryCountGroup(table, filter)
	}

	consultarReporte(filter, callback){
		return this.queryReport(table, filter)
	}
}

module.exports = Mantenimiento