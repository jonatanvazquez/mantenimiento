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

	addComponent(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW COMPONENT')
		}).then(function(result){
			console.log(result)
			return result.generated_keys[0]
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	updComponent(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE COMPONENT')
		}).then(function(result){
			console.log("Cambios: " + result.replaced)
			return result.replaced
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	delComponent(data){
		this.delete(table, data, function(){
			console.log('DELETE COMPONENT')
		}).then(function(result){
			console.log("Eliminados: " + result.deleted)
			return result.deleted
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	conComponent(filter, callback){
		this.consult(table, filter, callback).then(function(result){
			console.log(result)
			return result
		}).error(function(err){
			console.log(err)
			return err
		})
	}
}

module.exports = Componente
