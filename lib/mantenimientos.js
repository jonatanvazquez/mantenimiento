'use strict'

var Db = require('./db')
var uuid = require('uuid-base62')

let table = 'mantenimiento'
let hist = 'historyMaintenance'

class Mantenimiento extends Db {

	setMaintenanceID(){}
	setStatusMachine(statusMachine){}
	setActivity(activity){}
	setFrequency(frequency){}
	setQPoint(qPoint){}
	setQMMatrizNo(qmMatrizNo){}
	setKaizenType(kaizenType){}
	setKaizenNo(kaizenNo){}
	setInactivityTime(inactivityTime){}
	setAccumulativeNo(accumulativeNo){}
	setEWONo(eWONo){}
	setReason(reason){
		//Reason 1-6
	}
	setMaintenanceType(maintenanceType){}
	setMTTRAY(mTTRAY){}
	setMTBFAY(mTBFAY){}
	setMTTRLY(mTTRLY){}
	setMTBFLY(mTBFLY){}

	addMaintenance(data, idComponent){
		var idCreate = this.insert(table, data, function(){
			console.log('INSERT NEW MAINTENANCE')
		}).then(function(result){
			console.log(result)
			return result
		})

		this.insert(hist, {component_id : idComponent, maintenance_id : idCreate}, function(){
			console.log('INSERT HISTORY MAINTENANCE')
		}).then(function(result){
			console.log(result)
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