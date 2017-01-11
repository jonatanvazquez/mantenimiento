/**
 * actua como el server del sistema
 */
var express = require('express')
var app = express()
var session = require('express-session')
var Db = require('./lib/db') 
var db = new Db()
var jsonsafeparse = require('json-safe-parse')
var uuid = require('uuid-base62')
var express = require('express');
var exphbs  = require('express-handlebars');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var Usuario = require('./lib/usuario')
var Componente = require('./lib/componente')
var Mantenimiento = require('./lib/mantenimientos')

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
		var maquinas= new Componente()
		var id = async (function () { 
			return await (maquinas.addComponent(req.body))
		})
		res.end('Maquina Agregada')
})

app.get('/maquinas',function(req, res){
	var maquinas= new Componente()
	maquinas.consulta(1)
	maquinas.conComponent.then(function(result){
			console.log("Jala?" + result[0].vendor)
			res.render('home', {layout: 'main',maquinas: result});
	})

	
})

app.get('/componentes',function(req, res){
	res.render('componentes', {layout: 'main'});
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
	var m = new Mantenimiento()
	m.addMaintenance({
		prueba : "si"
	})

	res.send('listo')
})


/**
 * 
 */
app.listen(3000)