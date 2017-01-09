/**
 * actua como el server del sistema
 */
var express = require('express')
var app = express()
var session = require('express-session')
var Db = require('./lib/db') 
var async = require('async')

var jsonsafeparse = require('json-safe-parse');

/**
 * Acciones sobre los archivos [lectura, escritura, eliminar, actualizar]
 */

var fs = require('file-system')

/**
 * Lee los parametros que envia un formulario
 */
var bodyParser = require('body-parser')
 
app.use(express.static('global'))
app.use(express.static('web/assets'))
app.use(bodyParser.json()) //para aplicaciones json
app.use(bodyParser.urlencoded({extended:true})) //para realizar peticiones tradicionales
app.use(session({
	secret: "7SJUER349KERqdzts",
	resave: false,
	saveUninitialized: false
}))

 
app.get('/', function (req, res) {
	fs.readFile('./web/html/pages/index.html', function(err, html){
		var html_str = html.toString();
		res.send(html_str)
	})
})

app.post('/maquinas',function(req, res){
	fs.readFile('./web/html/pages/maquinas.html', function(err, html){
		console.log("Usuario: " + req.body.inputUser)
		console.log("Contraseña: " + req.body.inputPassword)
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/maquinas',function(req, res){
	fs.readFile('./web/html/pages/maquinas.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/componentes',function(req, res){
	fs.readFile('./web/html/pages/componentes.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/detalleComponente',function(req, res){
	fs.readFile('./web/html/pages/detallesComponente.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/setMantenimiento',function(req, res){
	fs.readFile('./web/html/pages/setMantenimiento.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/login',function(req, res) {

	//var data = {username : 'admin4', password : 'admin4'}
	var inst = new Db()
	inst.listUsers(2).then(function(midata){
				console.log(midata) 
			})

	// inst.listUsers(2).then(function(midata){
	// 	console.log(midata)
	// })
	
	res.send('CONSULTA EXITOSA el rol es: ')
})


/**
 * 
 */
app.listen(3000)