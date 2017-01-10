'use strict'

var Db = require('./db')

let table = 'maintenance'

class Mantenimiento extends Db {

	addMaintenance(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW MAINTENANCE')
		}).then(function(result){
			console.log(result)
			return result.generated_keys[0]
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	updMaintenance(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE MAINTENANCE')
		}).then(function(result){
			console.log("Cambios: " + result.replaced)
			return result.replaced
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	delMaintenance(data){
		this.delete(table, data, function(){
			console.log('DELETE MAINTENANCE')
		}).then(function(result){
			console.log("Eliminados: " + result.deleted)
			return result.deleted
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	conMaintenance(filter, callback){
		this.consult(table, filter, callback).then(function(result){
			console.log(result)
			return result
		}).error(function(err){
			console.log(err)
			return err
		})
	}
}

module.exports = Mantenimiento