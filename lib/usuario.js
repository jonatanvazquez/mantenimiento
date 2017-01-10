'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = "user"

class Usuario extends Db{
	
	addUser(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW USER')
		}).then(function(result){
			console.log(result)
			return result.generated_keys[0]
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	updUser(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE USER')
		}).then(function(result){
			console.log("Cambios: " + result.replaced)
			return result.replaced
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	delUser(data){
		this.delete(table, data, function(){
			console.log('DELETE USER')
		}).then(function(result){
			console.log("Eliminados: " + result.deleted)
			return result.deleted
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	conUser(filter, callback){
		this.consult(table, filter, callback).then(function(result){
			console.log(result)
			return result
		}).error(function(err){
			console.log(err)
			return err
		})
	}
}

module.exports = Usuario
