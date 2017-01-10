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
		console.log("Usuario: " + req.body.inputUser)
		console.log("Contraseña: " + req.body.inputPassword)
		res.send("Ok")
})

app.get(['/maquinas', '/componentes'],function(req, res){
	res.render('home', {layout: 'main'});
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
	var mantenimiento = new Mantenimiento()
	mantenimiento.addMaintenance({
		id: "123dkjas123-2312asdk",
		statusMachine: "",
		activity: "",
		frequency: 23,
		qPoint:,
		qmMatrizNo:,
		kaizenType:,
		kaizenNo:,
		inactivityTime:,
		accumulativeNo:,
		eWONo:,
		reason:,
		maintenanceType:,
		mTTRAY:,
		mTBFAY:,
		mTTRLY:,
		mTBFLY:
	},  "0c7ab5d4-a03f-410b-8a7b-fc1bc9e86541")
	res.send('listo')
})


/**
 * 
 */
app.listen(3000)