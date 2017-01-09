var r = require('rethinkdb')

const defaults = {
  host: 'localhost',
  port: 28015,
  db: 'mantenimiento'
}

class Db {

	constructor (options) {
	    options = options || {}
	    this.host = options.host || defaults.host
	    this.port = options.port || defaults.port
	    this.db = options.db || defaults.db 
	}

	connect () {
		this.connection = r.connect({
		    host: this.host,
		    port: this.port,
		    db: this.db
	    })
	    this.connected = true
	    let connection = this.connection
	    return connection
	}

	disconnect () {
		if(this.connected){
			this.connection.close()
		}
	}

	validaIngreso (opciones) {
		r.table('user').filter(opciones).run(connect(), function(err, result){
			if(err){
				console.log('Failed: ' + err)	
			} 

			if(result.length > 0){
				result.toArray(function(err, results){
					console.log(results)
					return results
				})
			}else{
				console.log('NO RESULTS')
			}
			this.disconnect()
		})
	}
	
	insert (tabla, opciones) {
		r.table('user').insert(opciones).run(connect(),function(err,result){
			if(err) console.log('Failed: ' + err)
			console.log(result)
			this.disconnect()
		})
	}

	delete (tabla, opciones, especificaciones) {
		r.table(tabla).filter(opciones).delete(especificaciones).run(connect(), function(err, result){
			if(err) console.log('Failed: ' + err)
			console.log(result)
			this.disconnect()
		})
	}

	update (tabla, opciones, especificaciones) {
		r.table(tabla).filter(opciones).update(especificaciones).run(conn, function(result){
			if(err) console.log('Failed: ' + err)
			console.log(result)
			this.disconnect()
		})
	}

	listUsers () {
		r.table('user').run(connect(),function(err,result){
			var resultados = []
			result.toArray(function(err, results) {
				console.log(results)
			})
			this.disconnect()
			return 1
		})
	}

	
}

/*



var getComponente = function(nombre_componente){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('component').filter({ componenteName: nombre_componente }).run(conn,function(result){
			console.log("Vista detalles componente: " + result)
		}).error(function(err){
			console.log("Fallo por: " + err)
		})
	})
}

var getMaquinas = function(){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('machinas').run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("error: " + err)
		})
	})
}

var acentuarMantenimiento = function(maquinaID, detalles){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('mantenimientos').insert({id_maquina: maquinaID, observacion: detalles, date: r.now()})
		.run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("error: " + err)
		})
	})
}

var listarMantenimientos = function(){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('mantenimientos').run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("Error fue " + err)
		})
	}).error(function(err){
		console.log("Problema para realizar la conexion")
	})
}

var listarMantenimientosFiltro = function(especificaciones){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('mantenimientos').filter(especificaciones).run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("error por " + err)
		})
	}).error(function(err){
		console.log("Problema para realizar la conexion")
	})
}

var listarMaquinasFiltro = function(especificaciones){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('maquinas').filter(especificaciones).run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("El error fue " + err)
		})
	}).error(function(err){
		console.log('Problema para poder realizar la conexion')
	})
}

var eliminarMaquina = function(filtros, especificaciones){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('maquina').filter(filtros).delete(especificaciones).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("El error fue " + err)
		})
	}).error(function(err){
		console.log("Problema para realizar la conexion")
	})
}

var eliminarComponente = function(filtros, especificaciones){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('componentes').filter(filtros).delete(especificaciones).run(conn).then(function(result){
			console.log(result)
		}).error(function(err){
			console.log("El error fue " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var updateMantenimiento = function(filtros, valores_actualizables){
	// r.connect({
	// 	host: 'localhost',
	// 	port: 28015,
	// 	db: 'mantenimiento'
	// }).then(function(conn){
	// 	return r.table('mantenimiento').filter(filtros).update(valores_actualizables).run(conn).then(function(result){
	// 		console.log("El resultado es: " + result)
	// 	}).error(function(err){
	// 		console.log("Error: " + err)
	// 	})
	// })error(function(err){
	// 	console.log("Problema para realiar la conexion")
	// })
}

var updateMaquina = function(filtros, valores_actualizables){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('machina').filter(filtros).update(valores_actualizables).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error por " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var updateComponente = function(filtros, valores_actualizables){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('componentes').filter(filtros).update(valores_actualizables).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error por " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var insertMaquina = function(valores){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('maquina').insert(valores).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log(err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var insertComponente = function(valores){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('componentes').insert(valores).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("error por " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var insertUser = function(valores){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').insert(valores).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("el error fue " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var updateUser = function(filtros, valores_actualizables){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').filter(filtros).update(valores_actualizables).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error: " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var deleteUser = function(filtros){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').delete(filtro).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error: " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var getAllUsers = function(){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').getAll().pluck({username, password}).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var getUserbyFullName = function(filtro){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').filter(filtro).pluck({username}).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var getUserByRol = function(filtro){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.table('user').filter(filtro).pluck({rol}).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})
}

var getAllTables =  function(){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		return r.tableList().run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("Error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})	
}

var getTableBy = function(filtros){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		r.tableList().filter(filtros).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})	
}

var insertTable = function(tableName){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		r.insertTable({table_name: tableName}).run(conn).then(function(result){
			console.log(result)
			conn.close()
		}).error(function(err){
			console.log("error " + err)
		})
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})	
}

var getCreateIndex = function(tabla, field){
	r.connect({
		host: 'localhost',
		port: 28015,
		db: 'mantenimiento'
	}).then(function(conn){
		
	}).error(function(err){
		console.log("Problemas para realizar la conexion")
	})		
}

var prueba = function(){
	return {'mensaje':'hola','asunto':'esto es una prueba'}
}

*/

module.exports.Db = new Db()