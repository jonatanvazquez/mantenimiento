'use strict'

var Db = require('./db')

let table = "component"

class Componente extends Db{

	setComponentName(componentName){
		this.componentName = componentName
	}

	getComponentName(){
		return this.componentName
	}
	
	setComponentImg(componentImg){
		this.componentImg = componentImg
	}
	
	getComponentImg(){
		return componentImg
	}
	
	setNoCtrlPat(noCtrlPat){
		this.noCtrlPat = noCtrlPat
	}
	
	getNoCtrlPat(){
		return noCtrlPat
	}
	
	setSection(section){
		this.section = section
	}
	
	getSection(){
		return this.section
	}
	
	setLocalizationStore(localizationStore){
		this.localizationStore = localizationStore
	}
	
	getLocalizationStore(){
		return this.localizationStore
	}

	setVendor(vendor){
		this.vendor = vendor
	}
	
	getVendor(){
		return this.vendor
	}
	
	setLabel(label){
		this.label = label
	}
	
	getLabel(){
		return this.label
	}
	
	setFrequency(frequency){
		this.frequency = frequency
	}
	
	getFrequency(){
		return this.frequency
	}
	
	setLength(length){
		this.length = length
	}
	
	getLength(){
		return this.length
	}
	
	setParent(parent){
		this.parent = parent
	}
	
	getParent(){
		return this.parent
	}

	addComponent(data){
		this.insert(table, data, function(){
			console.log('INSERT NEW COMPONENT')
		}).then(function(result){
			console.log(result)
			return result
		})
	}

	updComponent(data, chaines){
		this.update(table, data, chaines, function(){
			console.log('UPDATE COMPONENT')
		}).then(function(result){
			console.log(result)
		})
	}

	delComponent(data){
		this.delete(table, data, function(){
			console.log('DELETE COMPONENT')
		}).then(function(result){
			console.log(result)
		})
	}

	conComponent(filter, callback){
		return this.consult(table, filter, callback)
	}
}

module.exports = Componente
