'use strict'

var Db = require('./db')

let table = "component"
function lunes(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
function siguienteMantenimiento(fecha,frecuencia,hoy){

	var original = fecha.split("/")
	var inicio = lunes(new Date(original[2], original[1] - 1, original[0]))

	var semanas = Math.ceil(Math.round((hoy-inicio)/ 604800000)/frecuencia)*frecuencia
	if (semanas<=0) {semanas=0}
	inicio.setDate(inicio.getDate()+(7*semanas))
	return inicio
}
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

	consultarMaquinasUsuario(aream){
		return this.consultMachineUser(table, aream).then(function(result){
			return new Promise(function(resolve, reject) {
				resolve(result)
			})
		}).error(function(err){
			console.log(err)
			return err
		})
	}

	consultarSemanales(opciones){
	return this.consult(table,opciones).then(function(result){
			return new Promise(function(resolve, reject) {
				var hoy = lunes(new Date().setHours(0, 0, 0, 0))
				var componentesSemanales=0

				result.forEach(function(entry) {
					var inicio=siguienteMantenimiento(entry.nextMaintenance,entry.frequency,hoy)
					if (inicio.getTime()==hoy.getTime()) {
						componentesSemanales++
						console.log(componentesSemanales)
					}
				})
				resolve(componentesSemanales)
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

	fecha(opciones){
	return this.consultaFecha(table,opciones).then(function(result){
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
