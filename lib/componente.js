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
		.then(function(result){
			return result.replaced
		}).catch(err => {
			return err
		})
	}

	eliminar(data){
		return this.remove(table, data)
		.then(function(result){
			return result.deleted
		}).catch(err => {
			return err
		})
	}

	getComponentes(filtro){
		return this.componentGral(table, filtro)
	}

	consultar(opciones){
		return this.queries(table,opciones)
	}

	consultarMaquinasUsuario(aream){
		return this.queryMachinebyUser(table, aream)
	}

	consultarSemanales(opciones){
		return this.queries(table,opciones).then(result => {
			var hoy = lunes(new Date().setHours(0, 0, 0, 0))
			var componentesSemanales=0

			result.forEach(function(entry) {
				var inicio=siguienteMantenimiento(entry.nextMaintenance,entry.frequency,hoy)
				if (inicio.getTime()==hoy.getTime()) {
					componentesSemanales++	
				}
			})
			return componentesSemanales
		}).catch(err => {
			return err
		})
	}

	consultaPadres(opciones){
		return this.parents(table,opciones)
	}

	fecha(opciones){
		return this.queryDate(table,opciones)
	}
}

module.exports = Componente
