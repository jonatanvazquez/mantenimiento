require('./db')

var table = 'mantenimiento'

class Mantenimiento extends Db {

	constructor(options){

	}

	setNextMantenaince(){}
	setNoPart(){}
	setIDUser(){}
	setClasificacion(){}
	setInactivityTime(){}
	setAcumulativo(){}
	setEWO(){}
	setRootCause(){
		//is a number 1-6
	}
}