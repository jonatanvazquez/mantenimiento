'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = "user"

class Usuario extends Db{

	constructor(options){
		this.setUserName = options.username
		this.setFullName = options.fullName
		this.setPassword = options.password
		this.setRol = options.rol
		this.setSection = options.section
	}

	constructor(){

	}

	setIDUser(iDUser){
		this.iDUser = iDUser
	}

	getIDUser(){
		return this.iDUser
	}

	setUserName(username){
		this.username = username
	}

	getUsername(){
		return this.username
	}

	setFullName(fullName){
		this.fullName = fullName
	}

	getFullName(){
		return this.fullName
	}

	setPassword(password){
		this.password = password
	}

	getPassword(){
		return this.password
	}

	setRol(rol){
		this.rol = rol
	}

	getRol(){
		return this.rol
	}

	setSection(section){
		this.section = section
	}

	getSection(){
		return this.section
	}
	
	addUser(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW USER')
		}).then(function(result){
			console.log(result)
			return result
		})
	}

	updUser(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE USER')
		}).then(function(result){
			console.log(result)
		})
	}

	delUser(data){
		this.delete(table, data, function(){
			console.log('DELETE USER')
		}).then(function(result){
			console.log(result)
		})
	}

	conUser(filter, callback){
		return this.consult(table, filter, callback)
	}
}

module.exports = Usuario
