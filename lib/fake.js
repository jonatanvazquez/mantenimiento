'use strict'

var thinky = require('thinky')({
	host: 'localhost', 
	port: 28015,
	db: 'People'
})

var r = thinky.r

var People = thinky.createModel('People', {
	firstName: String,
	lastName: String,
	age: Number,
	date: { _type: Date, default: r.now() }
})

People.ensureIndex('date')

exports.list = function(req, res){
	People.orderBy({ index: r.desc('date') }).run().then(function(people){
		res.json(people)
	}).error(function(err){
		res.json({ message: err })
	})
}


exports.add = function(req, res){
	var person = new People(req.body)

	person.save().then(function(result){
		res.json(result)
	}).error(function(err){
		res.json({ message: err })
	})
}


exports.get = function(req, res){
	People.get(req.params.id).run().then(function(person){
		res.json(person)
	}).error(function(err){
		res.json({ message: err })
	})
}

exports.delete = function(req, res){
	People.get(req.params.id).run().then(function(person){
		person.delete().then(function(result){
			res.json(result)
		}).error(function(err){
			res.json({ message: err })
		})
	}).error(function(err){
		res.json({ message: err })
	})
}

exports.update = function(req, res){
	People.get(req.params.id).run().then(function(person){
		if(req.body.firstName){
			person.firstName = req.body.firstName
		}

		if(req.body.lastName){
			person.lastName = req.body.lastName
		}

		if(req.body.age){
			person.age = parseInt(req.body.age)
		}

		person.date = r.now()

		person.save().then(function(result){
			res.json(result)
		}).error(function(err){
			res.json({ message: err })
		})
	})
}