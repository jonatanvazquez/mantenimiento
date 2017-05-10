var r = require('rethinkdb')

const defaults = {
  host: 'localhost',
  port: 28015,
  db: 'mantenimiento'
}


function Db(options){
	options = options || {}
	this.host = options.host || defaults.host
	this.port = options.port || defaults.port
	this.db = options.db || defaults.db 
}

Db.prototype.connect = function(){
	this.connection = r.connect({
		host: this.host,
		port: this.port,
		db: this.db
	},function(err, conn){
		this.connected = true
		
		return conn
	})
}

Db.prototype.listUsers = function () {
		r.table('user').run(this.connect(),function(err,result){
			var resultados = []
			result.toArray(function(err, results) {
				
			})
			//this.disconnect()
			return 1
		})
	}

module.exports = Db