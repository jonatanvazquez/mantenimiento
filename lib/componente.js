'use strict'

var Db = require('./db')

let table = "component"

class Componente extends Db{

	/**
	 * 	Padre
	 * 	componentImg: "/imgE1.jpg" ,
		componentName: "CLEVER BROOKS" ,
		label: "B" ,
		localizationStore: "N/A" ,
		noCtrlPat: "FPC-123ED-22"

	 *  Hijo
	 *  componentImg: "/img22.jpg" ,
		componentName: "REFRACTARIO/AGUA" ,
		frequency: 3 ,
		length: 40 ,
		nextMaintenance: Tue Jan 10 2017 21:13:07 GMT+00:00 ,
		noCtrlPat: "FPC-123ED-18" ,
		parent: "6530346a-9bf7-4a6a-8b63-918560fefae6" ,
		section: "CUERPO CALDERA" ,
		vendor: "HP Automation"
	 */

	insertar(data){
		return this.insert(table, data)
		.then(function(result){
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
		return this.update(table, data, chaines)
		.then(function(result){
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

		return this.delete(table, data)
		.then(function(result){
			return new Promise(function(resolve, reject) {
				console.log("Eliminados: " + result.deleted)
				resolve(result.deleted)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}


	consultar(opciones){
	return this.consult(table,opciones).then(function(result){
			return new Promise(function(resolve, reject) {
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})

	}

	consultaPadres(opciones){
	return this.padres(table,opciones).then(function(result){
			return new Promise(function(resolve, reject) {
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})

	}


}

module.exports = Componente
