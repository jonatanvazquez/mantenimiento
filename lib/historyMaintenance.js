'use strict'

var Db = require('./db')

let table = 'historyMaintenance'

class Historico extends Db {

	addHistory(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW HISTORY')
		}).then(function(result){
			console.log(result)
			return result.generated_keys[0]
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	updHistory(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE HISTORY')
		}).then(function(result){
			console.log("Cambios: " + result.replaced)
			return result.replaced
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	delHistory(data){
		this.delete(table, data, function(){
			console.log('DELETE HISTORY')
		}).then(function(result){
			console.log("Eliminados: " + result.deleted)
			return result.deleted
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	conHistory(filter, callback){
		this.consult(table, filter, callback).then(function(result){
			console.log(result)
			return result
		}).error(function(err){
			console.log(err)
			return err
		})
	}
}