'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = 'mantenimiento'
let hist = 'historyMaintenance'

class Mantenimiento extends Db {

	addMaintenance(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW MAINTENANCE')
		}).then(function(result){
			console.log(result)
			return result
		})
	}

	updMaintenance(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE MAINTENANCE')
		}).then(function(result){
			console.log(result)
		})
	}

	delMaintenance(data){
		this.delete(table, data, function(){
			console.log('DELETE MAINTENANCE')
		}).then(function(result){
			console.log(result)
		})
	}

	conMaintenance(filter, callback){
		return this.consult(table, filter, callback)
	}
}

module.exports = Mantenimiento